import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, ArrowRight } from "lucide-react";

const StepCard = ({ step, title, description, children, imgSrc }) => (
    <div className="border-t pt-4">
        <h4 className="text-lg font-bold flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-6 h-6 bg-slate-800 text-white rounded-full text-sm">{step}</span>
            {title}
        </h4>
        <div className="pl-8 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
                <p className="text-slate-600">{description}</p>
                {children}
            </div>
            {imgSrc && (
                <div className="md:w-1/3">
                    <img src={imgSrc} alt={`Step ${step} illustration`} className="rounded-lg shadow-md border" />
                </div>
            )}
        </div>
    </div>
);

const CnameValue = ({ label, value }) => {
    const [copied, setCopied] = React.useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="space-y-1">
            <label className="font-semibold text-sm">{label}:</label>
            <div className="flex items-center gap-2">
                <code className="bg-slate-200 p-2 rounded text-xs break-all flex-grow">{value}</code>
                <Button onClick={copyToClipboard} size="icon" variant="ghost">
                    {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
};

export default function NamecheapDNSValidation() {
    return (
        <Card className="bg-slate-100 mt-4 border-slate-300">
            <CardHeader>
                <CardTitle className="text-xl">Visual Guide (Example: Namecheap)</CardTitle>
                <p className="text-slate-600 text-sm">Follow these visual steps. Your registrar's interface will look similar.</p>
            </CardHeader>
            <CardContent className="space-y-6">

                <StepCard step="1" title="Find 'Advanced DNS'" description="Log in to your domain registrar, find your domain `airealtors247.io`, and navigate to the DNS management section. It's often called 'Advanced DNS' or 'Manage DNS'." imgSrc="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b753a3615_Step1-DNS.png" />

                <StepCard step="2" title="Add First CNAME Record" description="Find the button to 'Add New Record' and select 'CNAME Record' as the type. Carefully copy and paste the values for the first record.">
                    <div className="bg-white p-4 rounded-lg border space-y-3">
                       <CnameValue label="Type" value="CNAME Record" />
                       <CnameValue label="Host" value="_3ebd169b23caeaf90a39339eb1ff8d85" />
                       <CnameValue label="Value" value="_92f19ddb497891b8ed67fb7b1e6c153c.xlfgrmvv.validations.aws." />
                       <p className="text-xs text-slate-500 pt-2"><strong>Important:</strong> For the 'Host' field, only paste the first part, before `airealtors247.io`. Your registrar adds the rest automatically.</p>
                    </div>
                </StepCard>

                <StepCard step="3" title="Confirm First Record" description="Your screen should now look something like this. The 'Host' field will show the full name." imgSrc="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7623a31d9_Step2-Record1.png" />
                
                <StepCard step="4" title="Add Second CNAME Record" description="Now, click 'Add New Record' again and do the same for the second record (the one for 'www').">
                    <div className="bg-white p-4 rounded-lg border space-y-3">
                       <CnameValue label="Type" value="CNAME Record" />
                       <CnameValue label="Host" value="_61cb81876b8ca4536fcdd94e3fdbd698.www" />
                       <CnameValue label="Value" value="_fc3d503770ef97f3d0bc400cf7d47f62.xlfgrm.validations.aws." />
                        <p className="text-xs text-slate-500 pt-2"><strong>Important:</strong> Again, only paste the part before `airealtors247.io` into the 'Host' field.</p>
                    </div>
                </StepCard>

                <StepCard step="5" title="Confirm and Save" description="You should now see both CNAME records listed. Click the 'Save All Changes' button. That's it! DNS changes can take a little while to update across the internet, so it might not validate instantly." imgSrc="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/0952077e6_Step3-BothRecords.png" />

            </CardContent>
        </Card>
    );
}