import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  RefreshCw, 
  GitBranch, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Webhook,
  Database,
  Zap
} from "lucide-react";

export default function Base44SyncSetup() {
  const [syncConfig, setSyncConfig] = useState({
    webhookUrl: '',
    apiToken: '',
    syncFrequency: 'weekly'
  });

  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const testConnection = async () => {
    setConnectionStatus('testing');
    // Simulate connection test
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-600" />
            Base44 Sync Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Webhook URL</label>
            <Input
              placeholder="https://your-domain.com/api/base44/webhook"
              value={syncConfig.webhookUrl}
              onChange={(e) => setSyncConfig({...syncConfig, webhookUrl: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">API Token</label>
            <Input
              type="password"
              placeholder="Enter your Base44 API token"
              value={syncConfig.apiToken}
              onChange={(e) => setSyncConfig({...syncConfig, apiToken: e.target.value})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Connection Status:</span>
              {connectionStatus === 'connected' && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              )}
              {connectionStatus === 'testing' && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  Testing...
                </Badge>
              )}
              {connectionStatus === 'disconnected' && (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Disconnected
                </Badge>
              )}
            </div>
            <Button onClick={testConnection} disabled={connectionStatus === 'testing'}>
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            Update Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-blue-200 bg-blue-50">
            <Zap className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Automatic Weekly Updates:</strong> Every Sunday at 2 AM EST, your platform will automatically 
              receive the latest AI improvements, new features, and industry updates from Base44.
            </AlertDescription>
          </Alert>

          <div className="mt-4 space-y-3">
            <h4 className="font-semibold">What Gets Updated:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                AI model improvements and new capabilities
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Real estate industry compliance updates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                New integrations and third-party connections
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Performance optimizations and bug fixes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                New templates and content library additions
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Deployment Safety
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">Zero Downtime Updates</h4>
                <p className="text-sm text-slate-600">Blue-green deployment ensures your platform stays online during updates.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold">Automatic Rollback</h4>
                <p className="text-sm text-slate-600">If any update fails, the system automatically reverts to the previous version.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Webhook className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <h4 className="font-semibold">Health Monitoring</h4>
                <p className="text-sm text-slate-600">Continuous monitoring ensures all systems are running optimally after updates.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}