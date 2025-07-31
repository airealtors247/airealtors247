import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import CreditPurchaseSlider from "../components/pricing/CreditPurchaseSlider";

export default function CreditPurchasePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  const handlePurchase = async (credits, cost) => {
    try {
      // Update user credits
      const updatedCredits = (user.credits_remaining || 0) + credits;
      await User.updateMyUserData({ 
        credits_remaining: updatedCredits 
      });
      
      // Reload user data
      await loadUser();
      
      alert(`Success! ${credits} credits added to your account.`);
    } catch (error) {
      console.error("Error updating credits:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Purchase Additional Credits
          </h1>
          <p className="text-xl text-slate-600">
            Get exactly what you need, when you need it
          </p>
        </div>

        <CreditPurchaseSlider 
          user={user} 
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
}