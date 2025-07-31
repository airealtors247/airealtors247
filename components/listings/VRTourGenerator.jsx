import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Wand2, Loader2, CheckCircle } from "lucide-react";
import { VRTour } from "@/api/entities";

export default function VRTourGenerator({ listings, user }) {
    const [selectedListing, setSelectedListing] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTour, setGeneratedTour] = useState(null);

    const handleGenerateTour = async () => {
        if (!selectedListing) {
            alert("Please select a listing to generate a tour.");
            return;
        }
        setIsGenerating(true);
        // Simulate VR tour generation
        await new Promise(resolve => setTimeout(resolve, 5000));
        const newTour = {
            listing_id: selectedListing.id,
            realtor_email: user.email,
            tour_url: `https://virtual-tours.airealtors247.com/${selectedListing.id}`,
            status: 'completed',
            source_image_urls: selectedListing.image_urls
        };
        const createdTour = await VRTour.create(newTour);
        setGeneratedTour(createdTour);
        setIsGenerating(false);
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Realty Tour Generator</CardTitle>
                <p className="text-sm text-slate-600">Create immersive realty tours from your existing listing photos.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <select 
                    onChange={(e) => setSelectedListing(listings.find(l => l.id === e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    <option value="">-- Select a Listing --</option>
                    {listings.map(l => <option key={l.id} value={l.id}>{l.address}</option>)}
                </select>
                
                <p className="text-xs text-slate-500">Ensure your selected listing has high-quality photos uploaded for best results.</p>
                
                <Button onClick={handleGenerateTour} disabled={!selectedListing || isGenerating} className="w-full">
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating Realty Tour...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Generate Tour
                        </>
                    )}
                </Button>

                {generatedTour && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <p className="font-semibold">Realty Tour for {selectedListing.address} is ready!</p>
                        <a href={generatedTour.tour_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                            View Tour
                        </a>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}