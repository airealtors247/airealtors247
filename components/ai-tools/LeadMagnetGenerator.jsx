
import React, { useState } from 'react';
import { LeadMagnet } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  Sparkles,
  Home,
  BarChart3,
  DollarSign,
  MapPin,
  Loader2,
  CheckCircle,
  Download,
  TrendingUp
} from "lucide-react";

const magnetTypes = [
  {
    value: "market_report",
    label: "Market Report",
    description: "Comprehensive local market analysis with trends and insights",
    icon: BarChart3,
    color: "text-blue-600"
  },
  {
    value: "home_valuation",
    label: "Home Valuation Guide",
    description: "Help homeowners understand their property value",
    icon: Home,
    color: "text-green-600"
  },
  {
    value: "buying_guide",
    label: "Home Buying Guide", 
    description: "Step-by-step guide for first-time and experienced buyers",
    icon: FileText,
    color: "text-purple-600"
  },
  {
    value: "selling_guide",
    label: "Home Selling Guide",
    description: "Complete guide to selling properties for maximum profit",
    icon: DollarSign,
    color: "text-amber-600"
  },
  {
    value: "investment_analysis",
    label: "Investment Analysis",
    description: "Real estate investment opportunities and ROI calculations",
    icon: TrendingUp,
    color: "text-indigo-600"
  },
  {
    value: "neighborhood_insights",
    label: "Neighborhood Insights",
    description: "Detailed area information including schools, amenities, and lifestyle",
    icon: MapPin,
    color: "text-red-600"
  }
];

export default function LeadMagnetGenerator({ onSuccess, user }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    target_zip_codes: user?.territory_zip_codes || []
  });
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!formData.type) {
      setError("Please select a lead magnet type");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const selectedType = magnetTypes.find(t => t.value === formData.type);
      
      // Build niche-specific context
      const nicheContext = user?.niche_specialization ? `
      SPECIALIZATION CONTEXT:
      - Property Focus: ${user.niche_specialization.property_types?.join(', ') || 'General'}
      - Target Clients: ${user.niche_specialization.target_clientele?.join(', ') || 'General'}
      - Brand Positioning: ${user.niche_specialization.brand_positioning || 'Professional Real Estate Services'}
      - Content Tone: ${user.niche_specialization.content_tone || 'professional'}
      
      IMPORTANT: Tailor all content specifically for this specialization. Use terminology, examples, and insights that speak directly to this niche market.
      ` : '';
      
      const prompt = `Create a comprehensive ${selectedType.label} for a specialized real estate professional.

${nicheContext}

Target Areas: ${formData.target_zip_codes.join(', ') || (user?.primary_city && user?.primary_zip_code ? user.primary_city + ', ' + user.primary_zip_code : 'General')}
Title: ${formData.title || 'Auto-generate niche-appropriate title'}
Description: ${formData.description || selectedType.description}

Please generate:
1. A niche-specific engaging title (if not provided)
2. A compelling description/introduction tailored to the specialization
3. Main content sections with detailed information relevant to the niche
4. Key insights and data points for the target property types and clientele
5. Call-to-action that positions the agent as THE specialist in this niche

Make it professional, niche-focused, and valuable for the specific target clientele. Focus on local market conditions and actionable insights that demonstrate deep expertise in the chosen specialization.

Format the response as a comprehensive document that can be used as a lead magnet.`;

      const response = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            content: { type: "string" },
            key_insights: {
              type: "array",
              items: { type: "string" }
            },
            call_to_action: { type: "string" }
          }
        }
      });

      setGeneratedContent(response);

    } catch (error) {
      console.error("Error generating lead magnet:", error);
      setError("Failed to generate content. Please try again.");
    }

    setIsGenerating(false);
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    try {
      await LeadMagnet.create({
        title: generatedContent.title,
        type: formData.type,
        description: generatedContent.description,
        content: generatedContent.content,
        target_zip_codes: formData.target_zip_codes,
        ai_prompt_used: "Generated via AI Content Studio",
        generation_date: new Date().toISOString(),
        is_active: true
      });

      setGeneratedContent(null);
      setFormData({
        type: "",
        title: "",
        description: "",
        target_zip_codes: user?.territory_zip_codes || []
      });
      
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error("Error saving lead magnet:", error);
      setError("Failed to save lead magnet. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Lead Magnet Generator</h2>
        <p className="text-slate-600">
          Create compelling real estate content that captures leads and builds your authority
        </p>
      </div>

      {!generatedContent ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Type Selection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Choose Content Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {magnetTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      formData.type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <type.icon className={`w-6 h-6 ${type.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h3 className="font-semibold text-slate-900">{type.label}</h3>
                        <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Customize Your Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Custom Title (Optional)
                </label>
                <Input
                  placeholder="Let AI generate a title or enter your own..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Additional Context (Optional)
                </label>
                <Textarea
                  placeholder="Add specific details, market conditions, or focus areas..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Target Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.target_zip_codes.map((zip) => (
                    <Badge key={zip} variant="secondary" className="bg-blue-100 text-blue-700">
                      {zip}
                    </Badge>
                  ))}
                  {formData.target_zip_codes.length === 0 && (
                    <span className="text-sm text-slate-500">Using general market data</span>
                  )}
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.type}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Lead Magnet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Generated Content Preview */
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Generated Content Preview
                </CardTitle>
                <Badge className="bg-green-100 text-green-700">Ready to Save</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {generatedContent.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {generatedContent.description}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Content Preview:</h3>
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-slate-700">
                    {generatedContent.content.substring(0, 500)}...
                    <span className="text-blue-600 font-medium"> [Preview - Full content available after saving]</span>
                  </div>
                </div>
              </div>

              {generatedContent.key_insights && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Key Insights:</h3>
                  <ul className="space-y-2">
                    {generatedContent.key_insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save Lead Magnet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGeneratedContent(null)}
                >
                  Generate New Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
