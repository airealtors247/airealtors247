import React, { useState, useEffect } from 'react';
import { DataVerification } from '@/api/entities';
import { BulkDataProcessing } from '@/api/entities';
import { CreditTransaction } from '@/api/entities';
import { User } from '@/api/entities';
import { UploadFile, ExtractDataFromUploadedFile } from '@/api/integrations';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Mail,
  Phone,
  Search,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Zap,
  Clock,
  FileText,
  Eye,
  DollarSign
} from "lucide-react";

export default function DataVerificationHub({ user }) {
  const [singleVerification, setSingleVerification] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const [bulkJobs, setBulkJobs] = useState([]);
  const [recentVerifications, setRecentVerifications] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bulkData, verificationData] = await Promise.all([
        BulkDataProcessing.filter({ realtor_email: user.email }, '-created_date', 10),
        DataVerification.filter({ realtor_email: user.email }, '-verification_timestamp', 20)
      ]);
      setBulkJobs(bulkData);
      setRecentVerifications(verificationData);
    } catch (error) {
      console.error("Error loading verification data:", error);
    }
  };

  const handleSingleVerification = async (verificationType) => {
    setIsProcessing(true);
    try {
      // Simulate API call to verification service
      const verificationResult = await DataVerification.create({
        realtor_email: user.email,
        verification_type: verificationType,
        input_data: singleVerification,
        verification_results: {
          email_status: singleVerification.email ? (Math.random() > 0.3 ? 'valid' : 'invalid') : null,
          phone_status: singleVerification.phone ? (Math.random() > 0.2 ? 'mobile' : 'invalid') : null,
          deliverability_score: Math.floor(Math.random() * 100),
          risk_score: Math.floor(Math.random() * 30)
        },
        enriched_data: {
          full_name: `${singleVerification.first_name} ${singleVerification.last_name}`,
          age: Math.floor(Math.random() * 50) + 25,
          income_range: "$50,000 - $75,000",
          home_owner_status: Math.random() > 0.5 ? "Owner" : "Renter",
          additional_phone_numbers: ["(555) 123-4567", "(555) 987-6543"]
        },
        service_provider: "zerobounce",
        cost_credits: verificationType === 'skip_tracing' ? 5 : 1,
        status: "completed",
        verification_timestamp: new Date().toISOString(),
        confidence_level: "high"
      });

      // Deduct credits
      await CreditTransaction.create({
        realtor_email: user.email,
        transaction_type: 'usage',
        activity_type: 'data_verification',
        credits_amount: -verificationResult.cost_credits,
        description: `${verificationType} verification`
      });

      loadData();
      setSingleVerification({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
      });
    } catch (error) {
      console.error("Error performing verification:", error);
    }
    setIsProcessing(false);
  };

  const handleBulkUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      // Upload file
      const { file_url } = await UploadFile({ file });
      
      // Extract data to count records
      const extractedData = await ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  phone: { type: "string" },
                  first_name: { type: "string" },
                  last_name: { type: "string" }
                }
              }
            }
          }
        }
      });

      if (extractedData.status === 'success') {
        const recordCount = extractedData.output.data?.length || 0;
        
        // Create bulk processing job
        await BulkDataProcessing.create({
          realtor_email: user.email,
          job_name: `Bulk Verification - ${file.name}`,
          uploaded_file_url: file_url,
          total_records: recordCount,
          verification_types: ['email_verification', 'phone_verification'],
          estimated_completion: new Date(Date.now() + (recordCount * 2000)).toISOString() // 2 seconds per record estimate
        });

        loadData();
        alert(`Successfully uploaded ${recordCount} records for verification!`);
      }
    } catch (error) {
      console.error("Error uploading bulk file:", error);
      alert('Error uploading file. Please try again.');
    }
    setUploadingFile(false);
  };

  const getStatusIcon = (status) => {
    const icons = {
      valid: CheckCircle,
      invalid: XCircle,
      risky: AlertTriangle,
      mobile: Phone,
      landline: Phone,
      completed: CheckCircle,
      processing: Clock,
      failed: XCircle
    };
    return icons[status] || AlertTriangle;
  };

  const getStatusColor = (status) => {
    const colors = {
      valid: "text-green-600",
      invalid: "text-red-600", 
      risky: "text-yellow-600",
      completed: "text-green-600",
      processing: "text-blue-600",
      failed: "text-red-600"
    };
    return colors[status] || "text-gray-600";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Data Verification & Enrichment Hub</h1>
            <p className="text-slate-600 text-lg">
              Verify emails, phones, and enrich contact data before campaigns
            </p>
          </div>
        </div>
      </div>

      {/* Credit Usage Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <DollarSign className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Credit Costs:</strong> Email verification (1 credit) • Phone verification (1 credit) • Skip tracing (5 credits) • Data enrichment (3 credits)
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="single">Single Verification</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Processing</TabsTrigger>
          <TabsTrigger value="history">History & Results</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Single Contact Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={singleVerification.email}
                    onChange={(e) => setSingleVerification({...singleVerification, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={singleVerification.phone}
                    onChange={(e) => setSingleVerification({...singleVerification, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    placeholder="John"
                    value={singleVerification.first_name}
                    onChange={(e) => setSingleVerification({...singleVerification, first_name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    placeholder="Doe"
                    value={singleVerification.last_name}
                    onChange={(e) => setSingleVerification({...singleVerification, last_name: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    placeholder="123 Main St, City, State, ZIP"
                    value={singleVerification.address}
                    onChange={(e) => setSingleVerification({...singleVerification, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => handleSingleVerification('email_verification')}
                  disabled={!singleVerification.email || isProcessing}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Verify Email (1 credit)
                </Button>
                <Button 
                  onClick={() => handleSingleVerification('phone_verification')}
                  disabled={!singleVerification.phone || isProcessing}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Verify Phone (1 credit)
                </Button>
                <Button 
                  onClick={() => handleSingleVerification('skip_tracing')}
                  disabled={(!singleVerification.first_name || !singleVerification.last_name) || isProcessing}
                  className="flex-1"
                  variant="outline"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Skip Trace (5 credits)
                </Button>
                <Button 
                  onClick={() => handleSingleVerification('data_enrichment')}
                  disabled={isProcessing}
                  className="flex-1"
                  variant="outline"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Enrich Data (3 credits)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Data Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                <p className="text-slate-600 mb-4">
                  Upload a CSV file with email, phone, first_name, last_name columns
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleBulkUpload}
                  disabled={uploadingFile}
                  className="hidden"
                  id="bulk-upload"
                />
                <label htmlFor="bulk-upload">
                  <Button asChild disabled={uploadingFile}>
                    <span>
                      {uploadingFile ? 'Uploading...' : 'Choose CSV File'}
                    </span>
                  </Button>
                </label>
              </div>

              {bulkJobs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Bulk Jobs</h3>
                  {bulkJobs.map((job) => (
                    <Card key={job.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{job.job_name}</h4>
                            <p className="text-sm text-slate-600">
                              {job.processed_records}/{job.total_records} records processed
                            </p>
                          </div>
                          <Badge className={job.processing_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {job.processing_status}
                          </Badge>
                        </div>
                        
                        <Progress value={(job.processed_records / job.total_records) * 100} className="mb-3" />
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">
                            Credits used: {job.total_cost_credits || 0}
                          </span>
                          {job.results_file_url && (
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download Results
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentVerifications.map((verification) => {
                  const StatusIcon = getStatusIcon(verification.verification_results?.email_status || verification.status);
                  return (
                    <div key={verification.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <StatusIcon className={`w-5 h-5 ${getStatusColor(verification.verification_results?.email_status || verification.status)}`} />
                        <div>
                          <p className="font-medium">
                            {verification.input_data?.email || verification.input_data?.phone || 'Data verification'}
                          </p>
                          <p className="text-sm text-slate-600">
                            {verification.verification_type.replace('_', ' ')} • 
                            {new Date(verification.verification_timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{verification.cost_credits} credits</p>
                        <p className="text-xs text-slate-500">{verification.confidence_level} confidence</p>
                      </div>
                    </div>
                  );
                })}
                
                {recentVerifications.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No verification history yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}