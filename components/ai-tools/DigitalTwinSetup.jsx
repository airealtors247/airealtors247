import React, { useState, useEffect } from 'react';
import { DigitalTwin } from "@/api/entities";
import { User } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Upload,
    Video,
    Mic,
    User as UserIcon,
    AlertTriangle,
    CheckCircle,
    Crown,
    Sparkles,
    Camera,
    FileVideo,
    VolumeX
} from "lucide-react";

export default function DigitalTwinSetup({ user, onComplete }) {
    const [digitalTwin, setDigitalTwin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [uploading, setUploading] = useState({
        voice: false,
        photos: false,
        video: false
    });
    const [consentSigned, setConsentSigned] = useState(false);
    const [activeTab, setActiveTab] = useState("consent");

    useEffect(() => {
        loadDigitalTwin();
    }, [user]);

    const loadDigitalTwin = async () => {
        try {
            const twinData = await DigitalTwin.filter({ realtor_email: user.email }, "-created_date", 1);
            if (twinData.length > 0) {
                setDigitalTwin(twinData[0]);
                setConsentSigned(twinData[0].usage_rights_signed);
                if (twinData[0].usage_rights_signed) {
                    setActiveTab("setup");
                }
            }
        } catch (error) {
            console.error("Error loading digital twin:", error);
        }
        setIsLoading(false);
    };

    const handleConsentSubmit = async () => {
        if (!consentSigned) {
            alert("Please review and accept the terms to continue.");
            return;
        }

        try {
            const twinData = {
                realtor_email: user.email,
                usage_rights_signed: true,
                consent_timestamp: new Date().toISOString(),
                clone_status: "pending_upload"
            };

            if (digitalTwin) {
                await DigitalTwin.update(digitalTwin.id, twinData);
            } else {
                await DigitalTwin.create(twinData);
            }

            await loadDigitalTwin();
            setActiveTab("setup");
        } catch (error) {
            console.error("Error saving consent:", error);
        }
    };

    const handleFileUpload = async (file, type) => {
        setUploading(prev => ({ ...prev, [type]: true }));
        
        try {
            const { file_url } = await UploadFile({ file });
            
            let updateData = {};
            if (type === 'voice') {
                updateData.voice_sample_url = file_url;
            } else if (type === 'video') {
                updateData.avatar_training_video = file_url;
            } else if (type === 'photos') {
                const currentPhotos = digitalTwin?.face_photos || [];
                updateData.face_photos = [...currentPhotos, file_url];
            }

            await DigitalTwin.update(digitalTwin.id, updateData);
            await loadDigitalTwin();
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
        }
        
        setUploading(prev => ({ ...prev, [type]: false }));
    };

    const processDigitalTwin = async () => {
        try {
            await DigitalTwin.update(digitalTwin.id, {
                clone_status: "processing",
                clone_created_date: new Date().toISOString()
            });
            
            // In production, this would trigger the actual AI cloning process
            setTimeout(async () => {
                await DigitalTwin.update(digitalTwin.id, {
                    clone_status: "ready",
                    voice_clone_id: "voice_" + Math.random().toString(36).substr(2, 9),
                    digital_avatar_id: "avatar_" + Math.random().toString(36).substr(2, 9)
                });
                await loadDigitalTwin();
                onComplete();
            }, 3000);
            
            await loadDigitalTwin();
        } catch (error) {
            console.error("Error processing digital twin:", error);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Digital Twin Creation</h1>
                        <p className="text-slate-600">Create your AI-powered digital presence</p>
                    </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Feature
                </Badge>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="consent">Legal Consent</TabsTrigger>
                    <TabsTrigger value="setup" disabled={!digitalTwin?.usage_rights_signed}>Setup & Upload</TabsTrigger>
                    <TabsTrigger value="preview" disabled={digitalTwin?.clone_status !== 'ready'}>Preview & Test</TabsTrigger>
                </TabsList>

                <TabsContent value="consent" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                Digital Likeness Usage Agreement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    <strong>Important Legal Notice:</strong> By proceeding, you grant AIRealtors247 permission to create and use your digital likeness (voice and appearance) for content generation purposes.
                                </AlertDescription>
                            </Alert>

                            <div className="bg-slate-50 p-6 rounded-lg space-y-4 max-h-64 overflow-y-auto">
                                <h4 className="font-semibold">Terms of Digital Twin Creation:</h4>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li>• Your voice and likeness will be used exclusively for your real estate marketing content</li>
                                    <li>• All generated content requires your approval before publication</li>
                                    <li>• You maintain full ownership and control over your digital likeness</li>
                                    <li>• You can revoke permissions and delete your digital twin at any time</li>
                                    <li>• AIRealtors247 will not use your likeness for any other purpose</li>
                                    <li>• Your biometric data is encrypted and stored securely</li>
                                    <li>• Generated content will include appropriate AI disclosure</li>
                                </ul>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="consent"
                                    checked={consentSigned}
                                    onCheckedChange={setConsentSigned}
                                />
                                <label htmlFor="consent" className="text-sm font-medium">
                                    I have read and agree to the Digital Likeness Usage Agreement
                                </label>
                            </div>

                            <Button 
                                onClick={handleConsentSubmit}
                                disabled={!consentSigned}
                                className="w-full"
                            >
                                Proceed to Setup
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="setup" className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Voice Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Mic className="w-5 h-5 text-blue-600" />
                                    Voice Clone
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-slate-600">
                                    Upload 5+ minutes of clear speech for voice cloning
                                </p>
                                
                                {digitalTwin?.voice_sample_url ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-sm">Voice sample uploaded</span>
                                    </div>
                                ) : (
                                    <div>
                                        <Input
                                            type="file"
                                            accept="audio/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) handleFileUpload(file, 'voice');
                                            }}
                                            disabled={uploading.voice}
                                        />
                                        {uploading.voice && (
                                            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                        )}
                                    </div>
                                )}
                                
                                <div className="text-xs text-slate-500">
                                    <p>Tips for best results:</p>
                                    <ul className="list-disc list-inside mt-1">
                                        <li>Record in a quiet environment</li>
                                        <li>Speak naturally and clearly</li>
                                        <li>Include varied expressions</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Photo Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Camera className="w-5 h-5 text-green-600" />
                                    Face Photos
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-slate-600">
                                    Upload 3-5 high-quality headshots from different angles
                                </p>
                                
                                <div className="space-y-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) handleFileUpload(file, 'photos');
                                        }}
                                        disabled={uploading.photos}
                                    />
                                    
                                    {digitalTwin?.face_photos?.length > 0 && (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm">{digitalTwin.face_photos.length} photos uploaded</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="text-xs text-slate-500">
                                    <p>Photo requirements:</p>
                                    <ul className="list-disc list-inside mt-1">
                                        <li>Well-lit, professional quality</li>
                                        <li>Direct face view</li>
                                        <li>Neutral expression</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Video Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileVideo className="w-5 h-5 text-purple-600" />
                                    Training Video
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-slate-600">
                                    Upload 2-3 minutes of you speaking directly to camera
                                </p>
                                
                                {digitalTwin?.avatar_training_video ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-sm">Training video uploaded</span>
                                    </div>
                                ) : (
                                    <div>
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) handleFileUpload(file, 'video');
                                            }}
                                            disabled={uploading.video}
                                        />
                                        {uploading.video && (
                                            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                        )}
                                    </div>
                                )}
                                
                                <div className="text-xs text-slate-500">
                                    <p>Video guidelines:</p>
                                    <ul className="list-disc list-inside mt-1">
                                        <li>Good lighting, stable camera</li>
                                        <li>Look directly at camera</li>
                                        <li>Natural hand gestures</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {digitalTwin?.voice_sample_url && digitalTwin?.face_photos?.length >= 3 && digitalTwin?.avatar_training_video && (
                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-6 text-center">
                                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-green-900 mb-2">Ready to Create Your Digital Twin!</h3>
                                <p className="text-green-700 mb-4">All required files have been uploaded. Processing typically takes 10-15 minutes.</p>
                                
                                <Button 
                                    onClick={processDigitalTwin}
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={digitalTwin?.clone_status === 'processing'}
                                >
                                    {digitalTwin?.clone_status === 'processing' ? (
                                        <>
                                            <VolumeX className="w-4 h-4 mr-2 animate-spin" />
                                            Processing Digital Twin...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Create Digital Twin
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                                Your Digital Twin is Ready!
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Voice Clone Status</h4>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Voice successfully cloned</span>
                                    </div>
                                    <Button variant="outline" size="sm">Test Voice Sample</Button>
                                </div>
                                
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Avatar Status</h4>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Avatar successfully created</span>
                                    </div>
                                    <Button variant="outline" size="sm">Preview Avatar</Button>
                                </div>
                            </div>
                            
                            <Alert className="mt-6">
                                <Sparkles className="h-4 w-4" />
                                <AlertDescription>
                                    Your digital twin is now ready to use in video content generation! All content will still require your approval before publishing.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}