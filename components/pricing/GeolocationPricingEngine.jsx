import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Shield, AlertTriangle, Globe } from 'lucide-react';

const PRICING_TIERS = {
  tier1: {
    name: "Premium Markets",
    countries: ["US", "CA", "GB", "AU", "DE", "FR", "CH", "NO", "SE", "DK"],
    multiplier: 1.0,
    color: "bg-red-100 text-red-800"
  },
  tier2: {
    name: "Standard Markets", 
    countries: ["ES", "IT", "KR", "AE", "BR", "MX", "RU", "TR", "JP", "SG"],
    multiplier: 0.7,
    color: "bg-yellow-100 text-yellow-800"
  },
  tier3: {
    name: "Emerging Markets",
    countries: ["IN", "PH", "NG", "KE", "VN", "EG", "MA", "CO", "ID", "TH"],
    multiplier: 0.4,
    color: "bg-green-100 text-green-800"
  }
};

export default function GeolocationPricingEngine({ user, onPricingUpdate }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pricingTier, setPricingTier] = useState(null);
  const [locationMismatch, setLocationMismatch] = useState(false);
  const [vpnDetected, setVpnDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectUserLocation();
  }, []);

  const detectUserLocation = async () => {
    try {
      // In production, use a reliable IP geolocation service
      // For demo, we'll simulate detection
      const mockDetection = {
        country: "US", // This would come from IP geolocation API
        region: "California",
        ip: "192.168.1.1",
        vpnDetected: false,
        confidence: 95
      };
      
      setCurrentLocation(mockDetection);
      
      // Determine pricing tier based on detected country
      const tier = determinePricingTier(mockDetection.country);
      setPricingTier(tier);
      
      // Check for location mismatch
      const registeredCountry = user?.country || "US";
      const mismatch = mockDetection.country !== registeredCountry;
      setLocationMismatch(mismatch);
      setVpnDetected(mockDetection.vpnDetected);
      
      // Log the geolocation data
      await logGeolocation(mockDetection, tier, mismatch);
      
      // Update parent component with pricing info
      if (onPricingUpdate) {
        onPricingUpdate({
          tier: tier.name,
          multiplier: tier.multiplier,
          country: mockDetection.country,
          mismatch: mismatch
        });
      }
      
    } catch (error) {
      console.error("Error detecting location:", error);
    }
    setIsLoading(false);
  };

  const determinePricingTier = (countryCode) => {
    for (const [tierKey, tierData] of Object.entries(PRICING_TIERS)) {
      if (tierData.countries.includes(countryCode)) {
        return { key: tierKey, ...tierData };
      }
    }
    // Default to tier2 if country not found
    return { key: "tier2", ...PRICING_TIERS.tier2 };
  };

  const logGeolocation = async (location, tier, mismatch) => {
    try {
      // In production, this would call your GeolocationLog API
      console.log("Logging geolocation:", {
        user_email: user?.email,
        detected_country: location.country,
        detected_region: location.region,
        ip_address: location.ip,
        pricing_tier_applied: tier.key,
        fraud_flags: mismatch ? ["location_mismatch"] : [],
        vpn_detected: location.vpnDetected
      });
    } catch (error) {
      console.error("Error logging geolocation:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 animate-spin" />
            <span className="text-sm">Detecting your location...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Location Display */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Current Location & Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Detected Location</p>
              <p className="text-sm text-slate-600">
                {currentLocation?.region}, {currentLocation?.country}
              </p>
            </div>
            <Badge className={pricingTier?.color}>
              {pricingTier?.name}
            </Badge>
          </div>
          
          <div className="text-sm text-slate-600">
            <p>Credits will be charged at <strong>{pricingTier?.name}</strong> rates</p>
            <p>Pricing multiplier: <strong>{pricingTier?.multiplier}x</strong></p>
          </div>
        </CardContent>
      </Card>

      {/* Location Mismatch Warning */}
      {locationMismatch && (
        <Alert variant="destructive" className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Location Change Detected:</strong> You registered in {user?.country} but are currently using the app from {currentLocation?.country}. 
            Credits will be charged at {pricingTier?.name} rates based on your current location.
          </AlertDescription>
        </Alert>
      )}

      {/* VPN Warning */}
      {vpnDetected && (
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>VPN/Proxy Detected:</strong> Please disable VPN for accurate location-based pricing. 
            Additional verification may be required for some features.
          </AlertDescription>
        </Alert>
      )}

      {/* Pricing Explanation */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📍 Location-Based Pricing</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Credits are charged based on your current location</li>
            <li>• Prices automatically adjust when you travel</li>
            <li>• This ensures fair pricing relative to local economies</li>
            <li>• VPN usage may trigger additional verification</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}