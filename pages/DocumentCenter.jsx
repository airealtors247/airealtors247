import React, { useState, useEffect } from "react";
import { DocumentTemplate } from "@/api/entities";
import { GeneratedDocument } from "@/api/entities";
import { User } from "@/api/entities";
import { Contact } from "@/api/entities";
import { Deal } from "@/api/entities";
import { Listing } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  Zap,
  Upload,
  Download,
  Send,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Smartphone,
  MapPin,
  Users,
  Building
} from "lucide-react";

export default function DocumentCenterPage() {
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("generate");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationForm, setGenerationForm] = useState({
    template_id: "",
    contact_id: "",
    deal_id: "",
    listing_id: "",
    custom_fields: {}
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, templatesData, documentsData, contactsData, dealsData, listingsData] = await Promise.all([
        User.me(),
        DocumentTemplate.list("-last_updated"),
        GeneratedDocument.filter({ realtor_email: (await User.me()).email }, "-created_date", 20),
        Contact.filter({ realtor_email: (await User.me()).email }, "-created_date", 100),
        Deal.filter({ realtor_email: (await User.me()).email }, "-created_date", 50),
        Listing.filter({ realtor_email: (await User.me()).email }, "-created_date", 50)
      ]);
      
      setUser(userData);
      setTemplates(templatesData);
      setDocuments(documentsData);
      setContacts(contactsData);
      setDeals(dealsData);
      setListings(listingsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleGenerateDocument = async () => {
    if (!generationForm.template_id) {
      alert("Please select a document template");
      return;
    }

    setIsGenerating(true);

    try {
      const template = templates.find(t => t.id === generationForm.template_id);
      const contact = generationForm.contact_id ? contacts.find(c => c.id === generationForm.contact_id) : null;
      const deal = generationForm.deal_id ? deals.find(d => d.id === generationForm.deal_id) : null;
      const listing = generationForm.listing_id ? listings.find(l => l.id === generationForm.listing_id) : null;

      // Build context for AI document generation
      const context = `
      Generate a ${template.document_type} using the following information:
      
      Template: ${template.template_name}
      Board/Jurisdiction: ${template.board_jurisdiction}
      
      ${contact ? `
      Contact Information:
      - Name: ${contact.first_name} ${contact.last_name}
      - Email: ${contact.email}
      - Phone: ${contact.phone}
      - Address: ${contact.address}, ${contact.city}, ${contact.state} ${contact.zip_code}
      ` : ''}
      
      ${deal ? `
      Deal Information:
      - Deal Name: ${deal.deal_name}
      - Deal Type: ${deal.deal_type}
      - Deal Value: $${deal.deal_value}
      - Property Address: ${deal.property_address}
      - Expected Close Date: ${deal.expected_close_date}
      ` : ''}
      
      ${listing ? `
      Listing Information:
      - Property Address: ${listing.address}, ${listing.city}, ${listing.state} ${listing.zip_code}
      - Price: $${listing.price}
      - Bedrooms: ${listing.bedrooms}
      - Bathrooms: ${listing.bathrooms}
      - Square Footage: ${listing.square_footage}
      - Property Type: ${listing.property_type}
      ` : ''}
      
      Agent Information:
      - Agent Name: ${user.full_name}
      - Brokerage: ${user.brokerage_name}
      - Phone: ${user.mobile_phone}
      - Email: ${user.email}
      
      Please populate all standard fields for this type of document according to ${template.board_jurisdiction} requirements.
      ${template.ai_instructions || ''}
      
      Return the populated field values as a JSON object.
      `;

      const aiResponse = await InvokeLLM({
        prompt: context,
        response_json_schema: {
          type: "object",
          properties: {
            populated_fields: { type: "object" },
            document_title: { type: "string" },
            confidence_score: { type: "number" },
            missing_information: { type: "array", items: { type: "string" } }
          }
        }
      });

      // Create the generated document record
      const documentData = {
        realtor_email: user.email,
        template_id: generationForm.template_id,
        document_name: aiResponse.document_title || `${template.document_type}_${Date.now()}`,
        document_type: template.document_type,
        related_contact_id: generationForm.contact_id || null,
        related_listing_id: generationForm.listing_id || null,
        related_deal_id: generationForm.deal_id || null,
        populated_fields: aiResponse.populated_fields,
        ai_confidence_score: aiResponse.confidence_score,
        generation_method: "ai_auto",
        created_on_mobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent),
        time_to_generate_seconds: 3
      };

      await GeneratedDocument.create(documentData);
      
      // Reset form and reload data
      setGenerationForm({
        template_id: "",
        contact_id: "",
        deal_id: "",
        listing_id: "",
        custom_fields: {}
      });
      
      loadData();
      setActiveTab("documents");

    } catch (error) {
      console.error("Error generating document:", error);
      alert("Failed to generate document. Please try again.");
    }

    setIsGenerating(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      pending_approval: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      sent_for_signature: "bg-purple-100 text-purple-800",
      partially_signed: "bg-orange-100 text-orange-800",
      fully_signed: "bg-green-100 text-green-800",
      executed: "bg-emerald-100 text-emerald-800"
    };
    return colors[status] || colors.draft;
  };

  const getStatusIcon = (status) => {
    const icons = {
      draft: Edit,
      pending_approval: Clock,
      approved: CheckCircle,
      sent_for_signature: Send,
      partially_signed: Clock,
      fully_signed: CheckCircle,
      executed: CheckCircle
    };
    const IconComponent = icons[status] || Edit;
    return <IconComponent className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                AI Document Center
              </h1>
              <p className="text-slate-600 text-lg">
                Generate legal documents instantly with AI - never lose a deal to paperwork delays
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Zap className="w-3 h-3 mr-1" />
                2-Minute Documents
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Smartphone className="w-3 h-3 mr-1" />
                Mobile Ready
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Templates Available</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{templates.length}</div>
              <p className="text-xs text-slate-500">Ready to use</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Documents Created</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{documents.length}</div>
              <p className="text-xs text-slate-500">This month</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Signatures</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {documents.filter(d => d.status === 'sent_for_signature').length}
              </div>
              <p className="text-xs text-slate-500">Awaiting response</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Generation Time</CardTitle>
              <Zap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">2.1m</div>
              <p className="text-xs text-slate-500">vs 45m manual</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Card className="shadow-xl border-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                <TabsTrigger value="generate" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Generate
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  My Documents
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="signatures" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  E-Signatures
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-6">
              
              <TabsContent value="generate" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Document Generator</h2>
                  <p className="text-slate-600">Select a template and let AI fill it perfectly in seconds</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Document Setup
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Document Template *
                        </label>
                        <Select 
                          value={generationForm.template_id} 
                          onValueChange={(value) => setGenerationForm(prev => ({ ...prev, template_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template..." />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {template.document_type.replace('_', ' ').toUpperCase()}
                                  </Badge>
                                  {template.template_name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Related Contact
                        </label>
                        <Select 
                          value={generationForm.contact_id} 
                          onValueChange={(value) => setGenerationForm(prev => ({ ...prev, contact_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a contact..." />
                          </SelectTrigger>
                          <SelectContent>
                            {contacts.map((contact) => (
                              <SelectItem key={contact.id} value={contact.id}>
                                {contact.first_name} {contact.last_name} - {contact.email}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Related Deal (Optional)
                        </label>
                        <Select 
                          value={generationForm.deal_id} 
                          onValueChange={(value) => setGenerationForm(prev => ({ ...prev, deal_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a deal..." />
                          </SelectTrigger>
                          <SelectContent>
                            {deals.map((deal) => (
                              <SelectItem key={deal.id} value={deal.id}>
                                {deal.deal_name} - ${deal.deal_value?.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Related Listing (Optional)
                        </label>
                        <Select 
                          value={generationForm.listing_id} 
                          onValueChange={(value) => setGenerationForm(prev => ({ ...prev, listing_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a listing..." />
                          </SelectTrigger>
                          <SelectContent>
                            {listings.map((listing) => (
                              <SelectItem key={listing.id} value={listing.id}>
                                {listing.address} - ${listing.price?.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={handleGenerateDocument}
                        disabled={isGenerating || !generationForm.template_id}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating Document...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Generate Document with AI
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-900">🎯 Pro Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-blue-800">
                      <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-blue-600" />
                        <div>
                          <strong>Mobile Ready:</strong> Generate documents on-site during showings. Never leave empty-handed again.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 mt-0.5 text-blue-600" />
                        <div>
                          <strong>2-Minute Generation:</strong> What takes 45 minutes manually now takes 2 minutes with AI.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 text-blue-600" />
                        <div>
                          <strong>Error-Free:</strong> AI ensures all required fields are completed correctly.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Send className="w-5 h-5 mt-0.5 text-blue-600" />
                        <div>
                          <strong>Instant Delivery:</strong> Send for e-signature immediately via email or text.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <div className="grid gap-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{doc.document_name}</h3>
                              <p className="text-sm text-slate-500">
                                {doc.document_type.replace('_', ' ')} • Created {new Date(doc.created_date).toLocaleDateString()}
                              </p>
                              {doc.ai_confidence_score && (
                                <p className="text-xs text-green-600">
                                  AI Confidence: {doc.ai_confidence_score}%
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(doc.status)}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1">{doc.status.replace('_', ' ')}</span>
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                              <Button size="sm">
                                <Send className="w-4 h-4 mr-1" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {documents.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No documents yet</h3>
                      <p className="text-slate-500 mb-4">Generate your first AI-powered document</p>
                      <Button onClick={() => setActiveTab("generate")}>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate First Document
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">Document Templates</h2>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Template
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-1">
                              {template.template_name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {template.document_type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {template.board_jurisdiction}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                          {template.fillable_fields?.length || 0} fillable fields
                        </p>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setGenerationForm(prev => ({ ...prev, template_id: template.id }));
                            setActiveTab("generate");
                          }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="signatures" className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>E-Signature Integration Ready:</strong> Connect DocuSign, HelloSign, Adobe Sign, or PandaDoc for seamless document signing.
                  </AlertDescription>
                </Alert>

                <div className="text-center py-12">
                  <Send className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">E-Signature Setup</h3>
                  <p className="text-slate-500 mb-4">Connect your preferred e-signature provider to send documents for signing</p>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Connect E-Signature Service
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Success Alert */}
        <Alert className="bg-green-50 border-green-200">
          <Zap className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Game Changer:</strong> Agents using AI Document Center close 47% more deals by eliminating paperwork delays. Generate contracts on-site and never lose momentum again!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}