import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Server, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Shield,
  Key,
  Network,
  Settings
} from 'lucide-react';

export default function DatabaseSetup() {
  const [showPassword, setShowPassword] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState('database');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-6 h-6" />
            Database Successfully Connected!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Connection Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Host:</span>
                  <span className="font-mono text-green-800">airealtors247-db.cvak20s2232f.us-east-2.rds.amazonaws.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Port:</span>
                  <span className="font-mono text-green-800">5432</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Database:</span>
                  <span className="font-mono text-green-800">postgres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">SSL:</span>
                  <Badge variant="outline" className="text-green-700 border-green-300">Required</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">What's Working</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>AWS RDS Instance Created</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Security Groups Configured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>SSL Encryption Enabled</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>pgAdmin Connected</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={deploymentStep} onValueChange={setDeploymentStep}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database Ready
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Deploy App
          </TabsTrigger>
          <TabsTrigger value="env" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Environment
          </TabsTrigger>
          <TabsTrigger value="launch" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Go Live
          </TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                Database Setup Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  Your AWS RDS PostgreSQL database is now ready for your AIRealtors247 application. 
                  Next, we'll deploy the application code and connect it to this database.
                </AlertDescription>
              </Alert>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Security Recommendations Completed:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>SSL/TLS encryption required for all connections</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Network className="w-4 h-4 text-green-600" />
                    <span>Security groups restrict access to authorized IPs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Key className="w-4 h-4 text-green-600" />
                    <span>Strong master password configured</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setDeploymentStep('application')} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue to Application Deployment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                Deploy AIRealtors247 Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  Now we'll set up the application server and connect it to your database.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Option 1: AWS EC2 Deployment (Recommended)</h4>
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-blue-800">
                      Deploy on AWS EC2 for best performance and integration with your RDS database.
                    </p>
                    <Button variant="outline" className="text-blue-600 border-blue-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Launch EC2 Setup Guide
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Option 2: Docker Deployment</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-gray-700">
                      Deploy using Docker on any server or cloud platform.
                    </p>
                    <Button variant="outline" className="text-gray-600 border-gray-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Docker Instructions
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setDeploymentStep('env')} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue to Environment Setup
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="env" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Environment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Settings className="h-4 w-4 text-purple-600" />
                <AlertDescription>
                  Configure your application environment variables to connect to the database.
                </AlertDescription>
              </Alert>

              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">.env file configuration:</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => copyToClipboard(`DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@airealtors247-db.cvak20s2232f.us-east-2.rds.amazonaws.com:5432/postgres?sslmode=require
DB_HOST=airealtors247-db.cvak20s2232f.us-east-2.rds.amazonaws.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD
DB_SSL=true`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <div>DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@airealtors247-db.cvak20s2232f.us-east-2.rds.amazonaws.com:5432/postgres?sslmode=require</div>
                  <div>DB_HOST=airealtors247-db.cvak20s2232f.us-east-2.rds.amazonaws.com</div>
                  <div>DB_PORT=5432</div>
                  <div>DB_NAME=postgres</div>
                  <div>DB_USER=postgres</div>
                  <div>DB_PASSWORD=YOUR_PASSWORD</div>
                  <div>DB_SSL=true</div>
                </div>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Replace "YOUR_PASSWORD" with your actual database password. 
                  Keep this information secure and never commit it to version control.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={() => setDeploymentStep('launch')} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continue to Launch
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="launch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Ready to Launch!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  Your database is ready and configured. Follow these final steps to launch your AIRealtors247 platform.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">Database Connected</div>
                    <div className="text-sm text-green-700">AWS RDS PostgreSQL ready for connections</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</div>
                  <div>
                    <div className="font-semibold text-blue-800">Deploy Application</div>
                    <div className="text-sm text-blue-700">Set up your application server and connect to database</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm">3</div>
                  <div>
                    <div className="font-semibold text-purple-800">Configure Environment</div>
                    <div className="text-sm text-purple-700">Set up environment variables and SSL connections</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm">4</div>
                  <div>
                    <div className="font-semibold text-orange-800">Go Live</div>
                    <div className="text-sm text-orange-700">Launch your AIRealtors247 platform</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Button className="bg-green-600 hover:bg-green-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Deploy on AWS EC2
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}