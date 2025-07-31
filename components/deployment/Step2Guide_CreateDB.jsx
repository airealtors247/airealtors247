
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Key, DollarSign } from "lucide-react";

export default function Step2Guide_CreateDB() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <Alert>
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
                <strong>IMPORTANT:</strong> Follow these steps exactly to use the AWS Free Tier and avoid charges.
            </AlertDescription>
        </Alert>

        {/* 1. Choose a database creation method */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">1</div>
                    Database Creation Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">Action: Select <Badge>Standard create</Badge></p>
                <p className="text-sm text-slate-600 mt-1">This is usually selected by default. It gives us the control we need.</p>
            </CardContent>
        </Card>

        {/* 2. Engine options */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">2</div>
                    Engine Options
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">Action: Click on <Badge variant="secondary">PostgreSQL</Badge></p>
                <p className="text-sm text-slate-600 mt-1">This is the database engine your platform is built on. Do NOT select the "Aurora" option.</p>
            </CardContent>
        </Card>

        {/* 3. Templates */}
        <Card className="border-green-400 bg-green-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-green-600">3</div>
                    Templates (Most Important Step!)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">Action: Select the <Badge className="bg-green-200 text-green-800">Free tier</Badge> option.</p>
                <p className="text-sm text-slate-600 mt-1">This will automatically configure the database to be free for the first 12 months.</p>
            </CardContent>
        </Card>

        {/* 4. Settings */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">4</div>
                    Settings
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="font-semibold">DB instance identifier:</label>
                    <p>Type: <code className="bg-slate-100 p-1 rounded">airealtors247-db</code></p>
                </div>
                <div>
                    <label className="font-semibold">Master username:</label>
                    <p>Leave this as: <code className="bg-slate-100 p-1 rounded">postgres</code></p>
                </div>
                <div className="border border-orange-300 bg-orange-50 p-3 rounded-lg">
                    <p className="font-semibold text-orange-900 flex items-center gap-2"><Key className="w-4 h-4"/> Master password:</p>
                    <p className="text-sm text-orange-800">Action: Create a strong password and <span className="font-bold">SAVE IT IMMEDIATELY</span> in a safe place. You will need this later.</p>
                    <p className="text-xs text-orange-600 mt-1">Example: <code className="bg-white p-1 rounded">MySecureP@ssw0rd2024!</code></p>
                </div>
            </CardContent>
        </Card>

         {/* 5. Connectivity */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">5</div>
                     Connectivity
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        For this next setting, find the "Public access" option. It might be inside a section called "Connectivity" or "Network settings".
                    </AlertDescription>
                </Alert>
                <div>
                    <p className="font-semibold">Action: Select <Badge variant="destructive">Yes</Badge> for "Public access".</p>
                    <p className="text-sm text-slate-600 mt-1">This is temporary so we can connect to it easily during setup. We will make it private later for security.</p>
                </div>
            </CardContent>
        </Card>

        {/* 6. Database options */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">6</div>
                     Additional Configuration
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">You may need to click a small arrow or link that says "Additional configuration" to see this option.</p>
                <div>
                    <label className="font-semibold">Initial database name:</label>
                    <p>Type: <code className="bg-slate-100 p-1 rounded">airealtors247</code></p>
                </div>
            </CardContent>
        </Card>
        
        {/* 7. Final Step */}
        <Card className="border-blue-400 bg-blue-50">
            <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-blue-900">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-600">7</div>
                    Create Database
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">Action: Scroll to the very bottom of the page and click the orange button that says <Badge className="bg-orange-500 text-white p-2 text-md">Create database</Badge>.</p>
                <p className="text-sm text-slate-600 mt-2">This process will take about 5-10 minutes. The status will say "Creating" for a while. This is normal.</p>
            </CardContent>
        </Card>
    </div>
  );
}
