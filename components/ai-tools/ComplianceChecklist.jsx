import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Shield, Scale, Heart } from "lucide-react";

const complianceChecks = [
  {
    key: "legal_check",
    label: "Legal Compliance",
    icon: Scale,
    description: "Adheres to real estate laws and regulations"
  },
  {
    key: "platform_rules_check", 
    label: "Platform Rules",
    icon: Shield,
    description: "Follows social media platform guidelines"
  },
  {
    key: "fair_housing_check",
    label: "Fair Housing",
    icon: Heart,
    description: "Complies with fair housing laws"
  },
  {
    key: "ethics_check",
    label: "Ethical Standards",
    icon: CheckCircle,
    description: "Meets professional ethics standards"
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case "pass":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "fail":
      return <XCircle className="w-4 h-4 text-red-600" />;
    case "pending":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-gray-400" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "pass":
      return "bg-green-100 text-green-800 border-green-200";
    case "fail":
      return "bg-red-100 text-red-800 border-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ComplianceChecklist({ report }) {
  if (!report) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">Compliance check pending...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const allPassed = complianceChecks.every(check => report[check.key] === "pass");
  const anyFailed = complianceChecks.some(check => report[check.key] === "fail");

  return (
    <Card className={`border-2 ${
      allPassed ? 'border-green-200 bg-green-50' : 
      anyFailed ? 'border-red-200 bg-red-50' : 
      'border-yellow-200 bg-yellow-50'
    }`}>
      <CardContent className="p-4 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            AI Compliance Report
          </h4>
          <Badge className={
            allPassed ? "bg-green-100 text-green-800" :
            anyFailed ? "bg-red-100 text-red-800" :
            "bg-yellow-100 text-yellow-800"
          }>
            {allPassed ? "All Checks Passed" : anyFailed ? "Issues Found" : "Reviewing"}
          </Badge>
        </div>

        {/* Compliance Checks Grid */}
        <div className="grid grid-cols-2 gap-3">
          {complianceChecks.map(check => {
            const status = report[check.key] || "pending";
            const CheckIcon = check.icon;
            
            return (
              <div key={check.key} className="flex items-center gap-2 p-2 rounded-lg bg-white border">
                <CheckIcon className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{check.label}</div>
                  <div className="text-xs text-slate-500">{check.description}</div>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(status)}
                  <Badge variant="outline" className={`text-xs ${getStatusColor(status)}`}>
                    {status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Uniqueness Score */}
        {report.uniqueness_score && (
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div>
              <div className="text-sm font-medium text-slate-900">Content Uniqueness</div>
              <div className="text-xs text-slate-500">Originality score vs existing content</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">{report.uniqueness_score}%</div>
                <div className={`text-xs ${
                  report.uniqueness_score >= 90 ? 'text-green-600' :
                  report.uniqueness_score >= 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {report.uniqueness_score >= 90 ? 'Excellent' :
                   report.uniqueness_score >= 70 ? 'Good' : 'Needs Work'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Summary */}
        {report.summary && (
          <div className="p-3 bg-white rounded-lg border">
            <div className="text-sm font-medium text-slate-900 mb-1">AI Compliance Summary</div>
            <div className="text-sm text-slate-600">{report.summary}</div>
          </div>
        )}

        {/* Action Required Warning */}
        {anyFailed && (
          <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <XCircle className="w-4 h-4" />
              <span className="font-medium">Action Required</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              This content has compliance issues that must be resolved before publication.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}