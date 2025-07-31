import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Gavel,
  Eye,
  FileText,
  Clock,
  User
} from 'lucide-react';

// Compliance rule definitions
const COMPLIANCE_RULES = {
  TCPA: {
    name: "Telephone Consumer Protection Act (US)",
    rules: [
      {
        id: "tcpa_consent",
        description: "Prior express written consent required for SMS/calls to cell phones",
        severity: "critical",
        check: (action) => {
          if (action.type === "sms" || action.type === "voice_call") {
            return action.recipients?.every(r => r.consent_status === "opt_in") || false;
          }
          return true;
        }
      },
      {
        id: "tcpa_time_restrictions",
        description: "No calls before 8 AM or after 9 PM local time",
        severity: "high",
        check: (action) => {
          if (action.type === "voice_call") {
            const hour = new Date(action.scheduled_time).getHours();
            return hour >= 8 && hour <= 21;
          }
          return true;
        }
      },
      {
        id: "tcpa_dnc_check",
        description: "Check against Do Not Call registry",
        severity: "critical",
        check: (action) => {
          if (action.type === "voice_call") {
            return action.recipients?.every(r => !r.on_dnc_list) || false;
          }
          return true;
        }
      }
    ]
  },
  GDPR: {
    name: "General Data Protection Regulation (EU)",
    rules: [
      {
        id: "gdpr_lawful_basis",
        description: "Must have lawful basis for processing personal data",
        severity: "critical",
        check: (action) => {
          return action.data_processing_consent === true;
        }
      },
      {
        id: "gdpr_right_to_object",
        description: "Respect right to object to direct marketing",
        severity: "high",
        check: (action) => {
          if (action.type === "marketing") {
            return action.recipients?.every(r => !r.has_objected) || false;
          }
          return true;
        }
      }
    ]
  },
  CASL: {
    name: "Canada's Anti-Spam Legislation",
    rules: [
      {
        id: "casl_express_consent",
        description: "Express consent required for commercial electronic messages",
        severity: "critical",
        check: (action) => {
          if (action.type === "email" && action.purpose === "commercial") {
            return action.recipients?.every(r => r.casl_consent === true) || false;
          }
          return true;
        }
      }
    ]
  },
  FAIR_HOUSING: {
    name: "Fair Housing Act",
    rules: [
      {
        id: "fh_no_discrimination",
        description: "No discriminatory language based on protected classes",
        severity: "critical",
        check: (action) => {
          if (action.content) {
            const discriminatoryKeywords = [
              'family-oriented', 'perfect for couples', 'ideal for singles',
              'mature community', 'young professionals', 'good schools'
            ];
            return !discriminatoryKeywords.some(keyword => 
              action.content.toLowerCase().includes(keyword.toLowerCase())
            );
          }
          return true;
        }
      }
    ]
  }
};

const ComplianceChecker = ({ action, userRegion, onComplianceResult }) => {
  const [complianceResults, setComplianceResults] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    checkCompliance();
  }, [action]);

  const checkCompliance = async () => {
    setIsChecking(true);
    const results = [];

    // Determine applicable compliance frameworks
    const applicableFrameworks = [];
    if (userRegion === 'US' || userRegion === 'CA') applicableFrameworks.push('TCPA');
    if (userRegion === 'EU') applicableFrameworks.push('GDPR');
    if (userRegion === 'CA') applicableFrameworks.push('CASL');
    applicableFrameworks.push('FAIR_HOUSING'); // Always applicable

    // Check each framework
    for (const framework of applicableFrameworks) {
      const rules = COMPLIANCE_RULES[framework];
      if (rules) {
        for (const rule of rules.rules) {
          const passed = rule.check(action);
          results.push({
            framework,
            rule_id: rule.id,
            rule_name: rule.description,
            severity: rule.severity,
            passed,
            framework_name: rules.name
          });
        }
      }
    }

    setComplianceResults(results);
    
    // Determine overall compliance status
    const hasCriticalFailures = results.some(r => !r.passed && r.severity === 'critical');
    const hasHighFailures = results.some(r => !r.passed && r.severity === 'high');
    
    let status = 'compliant';
    if (hasCriticalFailures) status = 'blocked';
    else if (hasHighFailures) status = 'warning';

    onComplianceResult({
      status,
      results,
      canProceed: status !== 'blocked'
    });

    setIsChecking(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-amber-600 bg-amber-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusIcon = (passed) => {
    return passed ? 
      <CheckCircle className="w-4 h-4 text-green-600" /> : 
      <XCircle className="w-4 h-4 text-red-600" />;
  };

  if (isChecking) {
    return (
      <Card className="border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-blue-600">
            <ShieldCheck className="w-5 h-5 animate-pulse" />
            <span>Running compliance checks...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const criticalFailures = complianceResults.filter(r => !r.passed && r.severity === 'critical');
  const warnings = complianceResults.filter(r => !r.passed && (r.severity === 'high' || r.severity === 'medium'));

  return (
    <Card className={`border-2 ${criticalFailures.length > 0 ? 'border-red-200 bg-red-50' : warnings.length > 0 ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {criticalFailures.length > 0 ? (
            <>
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span className="text-red-800">Compliance Issues Detected</span>
            </>
          ) : warnings.length > 0 ? (
            <>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800">Compliance Warnings</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="text-green-800">Compliance Verified</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalFailures.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Action Blocked:</strong> Critical compliance violations detected. 
              This action cannot proceed without resolving these issues.
            </AlertDescription>
          </Alert>
        )}

        {warnings.length > 0 && criticalFailures.length === 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Caution:</strong> Some compliance concerns detected. 
              Review carefully before proceeding.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          {complianceResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.passed)}
                <div>
                  <div className="text-sm font-medium">{result.rule_name}</div>
                  <div className="text-xs text-slate-500">{result.framework_name}</div>
                </div>
              </div>
              <Badge className={getSeverityColor(result.severity)}>
                {result.severity}
              </Badge>
            </div>
          ))}
        </div>

        {criticalFailures.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-slate-600">
              <strong>Recommendation:</strong> Contact your broker or compliance officer 
              for guidance on resolving these issues.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AuditTrail = ({ logs, onExport }) => {
  const [filter, setFilter] = useState('all');

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.compliance_status === filter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Compliance Audit Trail
          </div>
          <Button variant="outline" size="sm" onClick={onExport}>
            <FileText className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          {['all', 'compliant', 'warning', 'blocked'].map(status => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded border">
              <div className="flex items-center gap-3">
                <div className="text-xs text-slate-500">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div className="text-sm font-medium">{log.action_description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  className={
                    log.compliance_status === 'compliant' ? 'bg-green-100 text-green-800' :
                    log.compliance_status === 'warning' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {log.compliance_status}
                </Badge>
                <div className="text-xs text-slate-500">
                  <User className="w-3 h-3 inline mr-1" />
                  {log.approved_by || 'AI Auto'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ComplianceChecker, AuditTrail, COMPLIANCE_RULES };