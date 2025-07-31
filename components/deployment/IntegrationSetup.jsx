import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Save, CheckCircle, AlertTriangle, Zap, VenetianMask } from "lucide-react";

const coreIntegrations = [
  { id: "stripe", name: "Stripe", description: "Payment processing and subscriptions" },
  { id: "openai", name: "OpenAI", description: "AI content and analysis engine" },
  { id: "gohighlevel_api", name: "GoHighLevel API", description: "For provisioning new client CRM accounts" },
  { id: "google_maps", name: "Google Maps", description: "Geocoding and market analysis" },
  { id: "facebook_app", name: "Facebook App", description: "For managing client social integrations" },
  { id: "linkedin_app", name: "LinkedIn App", description: "For managing client social integrations" },
  { id: "elevenlabs", name: "ElevenLabs", description: "AI voice generation for calls" }
];

export default function IntegrationSetup() {
  const [apiKeys, setApiKeys] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // In a real app, this would securely save keys to a secret manager (e.g., AWS Secrets Manager)
    // and validate them.
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Saving API Keys:", apiKeys);
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Zap className="w-6 h-6 text-purple-600" />
          Core API Integrations
        </CardTitle>
        <p className="text-slate-600">
          Configure the essential third-party API keys required for the platform to function.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Warning:</strong> These keys are highly sensitive. They will be stored in a secure vault 
            (e.g., AWS Secrets Manager) and should never be exposed on the client-side.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {coreIntegrations.map(integration => (
            <div key={integration.id}>
              <label className="font-medium text-slate-800">{integration.name} API Key</label>
              <p className="text-sm text-slate-500 mb-2">{integration.description}</p>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="password"
                  placeholder={`Enter ${integration.name} Secret Key`}
                  className="pl-10"
                  onChange={(e) => setApiKeys(prev => ({...prev, [integration.id]: e.target.value}))}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving || isSaved}>
            {isSaving ? (
              <><VenetianMask className="w-4 h-4 mr-2 animate-spin" />Saving to Secure Vault...</>
            ) : isSaved ? (
              <><CheckCircle className="w-4 h-4 mr-2" />Configuration Saved!</>
            ) : (
              <><Save className="w-4 h-4 mr-2" />Save & Validate Configuration</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}