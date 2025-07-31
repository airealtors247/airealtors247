
import React, { useState, useEffect } from "react";
import { Website } from "@/api/entities";
import { User } from "@/api/entities";
import { InvokeLLM, GenerateImage } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Sparkles, Image, CheckCircle, Loader2, Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WebsiteBuilderPage() {
  const [user, setUser] = useState(null);
  const [website, setWebsite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const userData = await User.me();
    setUser(userData);
    const websites = await Website.filter({ realtor_email: userData.email });
    if (websites.length > 0) {
      setWebsite(websites[0]);
    }
    setIsLoading(false);
  };

  const handleGenerateWebsite = async () => {
    setIsGenerating(true);
    try {
      const prompt = `
        Create professional website content for a realtor named ${user.full_name} from ${user.brokerage_name}.
        Their target market is ${user.primary_city}, ${user.brokerage_state}.
        Generate the following content in a JSON format:
        - hero_title: A catchy, professional headline.
        - hero_subtitle: A supportive subtitle.
        - about_section_content: A compelling 'About Me' section, written in the first person.
        - services_offered: An array of 3 objects, each with a 'service_name' (e.g., 'Buyer Representation') and a 'description'.
        - seo_keywords: An array of 10 relevant SEO keywords for their market.
      `;
      
      const contentResult = await InvokeLLM({
        prompt,
        response_json_schema: {
            type: "object",
            properties: {
                hero_title: {type: "string"},
                hero_subtitle: {type: "string"},
                about_section_content: {type: "string"},
                services_offered: {type: "array", items: {type: "object", properties: {service_name: {type: "string"}, description: {type: "string"}}}},
                seo_keywords: {type: "array", items: {type: "string"}}
            }
        }
      });

      const imageResult = await GenerateImage({ prompt: `A professional, bright, modern home exterior in ${user.primary_city}, sunny day, real estate photography` });

      const websiteData = {
        realtor_email: user.email,
        ...contentResult,
        hero_image_url: imageResult.url,
        status: "draft"
      };

      let updatedWebsite;
      if (website) {
        updatedWebsite = await Website.update(website.id, websiteData);
      } else {
        updatedWebsite = await Website.create(websiteData);
      }
      setWebsite(updatedWebsite);
      
    } catch (error) {
      console.error("Error generating website:", error);
      alert("Failed to generate website. Please try again.");
    }
    setIsGenerating(false);
  };
  
  const handlePublish = async () => {
    if (!website) return;
    
    // Set the domain for the isolated .io site
    const baseName = user.full_name.toLowerCase().replace(/\s/g, '-');
    const primaryDomain = `${baseName}.airealtors247.io`;
    
    await Website.update(website.id, { 
      status: "published", 
      domain_name: primaryDomain,
      backup_domain: null // Ensure no link to the .com site for full isolation
    });
    
    await User.updateMyUserData({ 
      website_url: `https://${primaryDomain}`,
      backup_website_url: null // Remove backup URL to maintain separation
    });
    
    await loadData();
    alert(`Your website is now live at: https://${primaryDomain}`);
  };


  if (isLoading) return <div className="text-center p-8"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Globe className="w-8 h-8 text-blue-600" />
          AI Website Builder
        </h1>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Your Professional Website</CardTitle>
            <p className="text-slate-600">Generate and manage your SEO-optimized website in minutes.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!website && (
              <div className="text-center py-12">
                <p className="text-lg mb-4">You don't have a website yet. Let's create one!</p>
                <Button onClick={handleGenerateWebsite} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate My Website with AI
                </Button>
              </div>
            )}

            {website && (
              <div>
                <Alert className={website.status === 'published' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}>
                  <AlertTitle className="flex items-center gap-2">
                    {website.status === 'published' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Loader2 className="h-4 w-4 text-yellow-600" />}
                    Website Status: <Badge>{website.status}</Badge>
                  </AlertTitle>
                  <AlertDescription>
                    {website.status === 'published' 
                      ? <>Your website is live at: <a href={`https://${website.domain_name}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600">{`https://${website.domain_name}`}</a></>
                      : 'Your website is a draft. Review the content and publish when ready.'}
                  </AlertDescription>
                </Alert>

                <div className="mt-6 space-y-4">
                  {/* Website Preview could be a component here */}
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Website Preview</h3>
                    <div className="aspect-video bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${website.hero_image_url})`}}>
                        <div className="bg-black/50 w-full h-full flex flex-col justify-center items-center text-white p-4">
                           <h1 className="text-3xl font-bold text-center">{website.hero_title}</h1>
                           <p className="text-lg text-center mt-2">{website.hero_subtitle}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold">About {user.full_name}</h4>
                        <p className="text-sm text-slate-700">{website.about_section_content}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button onClick={handleGenerateWebsite} variant="outline" disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Regenerate with AI
                  </Button>
                  <Button onClick={handlePublish} disabled={website.status === 'published' || isGenerating}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish Website
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
