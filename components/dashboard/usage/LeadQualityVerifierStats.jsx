import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function LeadQualityVerifierStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-cyan-100 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-cyan-600" />
        </div>
        <CardTitle className="text-lg">Lead Quality Verifier</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Leads Verified" value="1,234" />
        <StatItem label="Valid Phone Numbers" value="89%" />
        <StatItem label="Valid Email Addresses" value="94%" />
        <StatItem label="Bad Data Removed" value="156" />
        <StatItem label="Verification Accuracy" value="97%" />
      </CardContent>
    </Card>
  );
}