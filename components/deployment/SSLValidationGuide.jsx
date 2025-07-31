
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  CheckCircle,
  HelpCircle,
  Loader2,
  ShieldCheck
} from "lucide-react";

const CnameRecordCard = ({ domain, name, value }) => {
    const [copiedName, setCopiedName] = useState(false);
    const [copiedValue, setCopiedValue] = useState(false);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'name') {
            setCopiedName(true);
            setTimeout(() => setCopiedName(false), 2000);
        } else {
            setCopiedValue(true);
            setTimeout(() => setCopiedValue(false), 2000);
        }
    };

    return (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-3">
            <h4 className="font-bold text-slate-800">Record for: <span className="font-mono text-blue-700">{domain}</span></h4>
            <div className="space-y-2 font-mono text-sm">
                <p><strong>Type:</strong> CNAME</p>
                <div>
                    <strong className="block mb-1">Name/Host:</strong>
                    <div className="flex items-center gap-2">
                        <code className="bg-slate-200 p-2 rounded text-xs break-all flex-grow">{name}</code>
                        <Button onClick={() => copyToClipboard(name, 'name')} size="icon" variant="ghost">
                            {copiedName ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
                <div>
                    <strong className="block mb-1">Value/Target:</strong>
                     <div className="flex items-center gap-2">
                        <code className="bg-slate-200 p-2 rounded text-xs break-all flex-grow">{value}</code>
                        <Button onClick={() => copyToClipboard(value, 'value')} size="icon" variant="ghost">
                           {copiedValue ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SSLValidationGuide() {
    const [validationState, setValidationState] = useState('pending');
    // showExample state and related UI elements are removed as per the outline.

    return (
        <Card className="shadow-xl border-blue-200">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-blue-800">
                    <ShieldCheck className="w-7 h-7" />
                    Step 2: Validate Your Domain Ownership
                </CardTitle>
                <p className="text-slate-600">
                    To secure your website with HTTPS, you must prove you own{" "}
                    <code className="bg-slate-100 p-1 rounded">airealtors247.io</code>. This is done by adding
                    two special CNAME records to your domain's DNS settings.
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-2">
                        1. Find Your CNAME Records in AWS Certificate Manager
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                        In your AWS account, navigate to Certificate Manager (ACM) for the N.
                        Virginia (us-east-1) region. Find the certificate for{" "}
                        <code className="bg-slate-100 p-1 rounded">airealtors247.io</code> and you will
                        see two CNAME records provided by AWS. They will look similar to the
                        examples below.
                    </p>
                </div>
                
                <div className="space-y-4">
                   <CnameRecordCard 
                        domain="airealtors247.io"
                        name="_xxxxxxxxxxxxxxxxx.airealtors247.io."
                        value="_yyyyyyyyyyyyyyyyy.zzzzzzzzzzzzz.acm-validations.aws."
                    />
                    <CnameRecordCard 
                        domain="www.airealtors247.io"
                        name="_aaaaaaaaaaaaaaaaa.www.airealtors247.io."
                        value="_bbbbbbbbbbbbbbbb.zzzzzzzzzzzzz.acm-validations.aws."
                    />
                </div>
                
                <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                  <HelpCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                   Your DNS provider might automatically add `airealtors247.io` to the end of the "Name/Host" field. If so, you only need to paste the part before the domain (e.g., `_3ebd169b23caeaf90a39339eb1ff8d85`). Copy the values exactly.
                  </AlertDescription>
                </Alert>
                
                {validationState === 'waiting' && (
                     <Alert className="bg-blue-50 border-blue-200">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          Great! AWS is now checking for the records. This can take up to a few hours due to DNS propagation. You can leave this page and check back later. Once validated, you can proceed to Step 3.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="text-center pt-4 border-t">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => setValidationState('waiting')}>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        I've Added The Records in My Registrar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
