import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvokeLLM, GenerateImage } from "@/api/integrations";
import { Listing } from "@/api/entities";
import {
  Sparkles,
  FileText,
  Camera,
  Wand2,
  Copy,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AIListingAssistant({ user, onListingCreated }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [basicInfo, setBasicInfo] = useState({
    address: "",
    city: "",
    state: "",
    zip_code: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    square_footage: "",
    property_type: "single_family"
  });

  const generateListingContent = async () => {
    if (!basicInfo.address || !basicInfo.city || !basicInfo.price) {
      alert("Please fill in at least the address, city, and price to generate content.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await InvokeLLM({
        prompt: `As a professional real estate copywriter, create compelling listing content for this property:
        
        Address: ${basicInfo.address}, ${basicInfo.city}, ${basicInfo.state} ${basicInfo.zip_code}
        Price: $${basicInfo.price}
        Bedrooms: ${basicInfo.bedrooms}
        Bathrooms: ${basicInfo.bathrooms}
        Square Footage: ${basicInfo.square_footage}
        Property Type: ${basicInfo.property_type}
        
        Generate:
        1. A compelling property description (200-300 words)
        2. Marketing headline (under 50 characters)
        3. Key selling points (5-7 bullet points)
        4. Social media posts for Facebook and Instagram
        5. Email campaign content
        6. Neighborhood highlights for ${basicInfo.city}, ${basicInfo.state}
        
        Make it engaging, professional, and compliant with fair housing laws.`,
        response_json_schema: {
          type: "object",
          properties: {
            property_description: { type: "string" },
            marketing_headline: { type: "string" },
            key_selling_points: { type: "array", items: { type: "string" } },
            social_media_posts: {
              type: "object",
              properties: {
                facebook: { type: "string" },
                instagram: { type: "string" }
              }
            },
            email_campaign: { type: "string" },
            neighborhood_highlights: { type: "array", items: { type: "string" } }
          }
        }
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
    }
    setIsGenerating(false);
  };

  const createListingFromGenerated = async () => {
    if (!generatedContent) return;

    try {
      await Listing.create({
        ...basicInfo,
        realtor_email: user.email,
        price: parseFloat(basicInfo.price),
        bedrooms: parseInt(basicInfo.bedrooms) || 0,
        bathrooms: parseFloat(basicInfo.bathrooms) || 0,
        square_footage: parseInt(basicInfo.square_footage) || 0,
        description: generatedContent.property_description,
        features: generatedContent.key_selling_points,
        neighborhood_highlights: generatedContent.neighborhood_highlights,
        ai_generated_content: {
          property_description: generatedContent.property_description,
          marketing_headline: generatedContent.marketing_headline,
          social_media_posts: [
            generatedContent.social_media_posts.facebook,
            generatedContent.social_media_posts.instagram
          ],
          email_campaign_content: generatedContent.email_campaign,
          listing_highlights: generatedContent.key_selling_points
        },
        listing_preparation_status: "ai_generated",
        status: "active"
      });

      alert("Listing created successfully with AI-generated content!");
      onListingCreated();
      
      // Reset form
      setBasicInfo({
        address: "",
        city: "",
        state: "",
        zip_code: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        square_footage: "",
        property_type: "single_family"
      });
      setGeneratedContent(null);
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Listing Assistant
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter basic property information and let AI create professional listings, descriptions, and marketing content.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Property Address"
              value={basicInfo.address}
              onChange={(e) => setBasicInfo({...basicInfo, address: e.target.value})}
            />
            <Input
              placeholder="City"
              value={basicInfo.city}
              onChange={(e) => setBasicInfo({...basicInfo, city: e.target.value})}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="State"
              value={basicInfo.state}
              onChange={(e) => setBasicInfo({...basicInfo, state: e.target.value})}
            />
            <Input
              placeholder="Zip Code"
              value={basicInfo.zip_code}
              onChange={(e) => setBasicInfo({...basicInfo, zip_code: e.target.value})}
            />
            <Input
              placeholder="Price"
              type="number"
              value={basicInfo.price}
              onChange={(e) => setBasicInfo({...basicInfo, price: e.target.value})}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Bedrooms"
              type="number"
              value={basicInfo.bedrooms}
              onChange={(e) => setBasicInfo({...basicInfo, bedrooms: e.target.value})}
            />
            <Input
              placeholder="Bathrooms"
              type="number"
              step="0.5"
              value={basicInfo.bathrooms}
              onChange={(e) => setBasicInfo({...basicInfo, bathrooms: e.target.value})}
            />
            <Input
              placeholder="Square Footage"
              type="number"
              value={basicInfo.square_footage}
              onChange={(e) => setBasicInfo({...basicInfo, square_footage: e.target.value})}
            />
          </div>
          
          <Button 
            onClick={generateListingContent}
            disabled={isGenerating}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating AI Content...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Listing Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Marketing Headline</h4>
                  <p className="bg-blue-50 p-3 rounded border">{generatedContent.marketing_headline}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Property Description</h4>
                  <p className="bg-gray-50 p-3 rounded border text-sm leading-relaxed">
                    {generatedContent.property_description}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="marketing" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Selling Points</h4>
                  <ul className="space-y-2">
                    {generatedContent.key_selling_points?.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Neighborhood Highlights</h4>
                  <ul className="space-y-2">
                    {generatedContent.neighborhood_highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Facebook Post</h4>
                  <p className="bg-blue-50 p-3 rounded border text-sm">
                    {generatedContent.social_media_posts?.facebook}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Instagram Post</h4>
                  <p className="bg-pink-50 p-3 rounded border text-sm">
                    {generatedContent.social_media_posts?.instagram}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Email Campaign Content</h4>
                  <p className="bg-green-50 p-3 rounded border text-sm leading-relaxed">
                    {generatedContent.email_campaign}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy All Content
              </Button>
              <Button onClick={createListingFromGenerated} className="bg-green-600 hover:bg-green-700">
                <FileText className="w-4 h-4 mr-2" />
                Create Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}