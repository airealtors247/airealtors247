import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertTriangle, 
  Users, 
  Mail, 
  MessageSquare,
  Shield,
  Zap,
  Target
} from 'lucide-react';

export default function BlastConfirmationModal({ contactCount, onConfirm, onCancel, platforms = [] }) {
  const [confirmChecks, setConfirmChecks] = useState({
    hasPermission: false,
    understandsConsequences: false,
    acceptsResponsibility: false
  });

  const allChecked = Object.values(confirmChecks).every(Boolean);

  const estimatedReach = contactCount * 2.5; // Assuming social amplification
  const expectedSignups = Math.floor(contactCount * 0.02); // 2% conversion estimate
  const expectedCredits = expectedSignups * 0.3 * 100; // Assuming 30% upgrade to paid

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl">⚡ Viral Blast Confirmation</CardTitle>
          <p className="text-gray-600">
            You're about to launch a massive outreach campaign
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Impact Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Campaign Impact Projection
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{contactCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Direct Contacts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{estimatedReach.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Est. Total Reach</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{expectedSignups}</div>
                <div className="text-sm text-gray-600">Expected Signups</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{Math.floor(expectedCredits)}</div>
                <div className="text-sm text-gray-600">Potential Credits</div>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div>
            <h4 className="font-semibold mb-3">Blast Channels</h4>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email Invites
              </Badge>
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                SMS Messages
              </Badge>
              {platforms.map(platform => (
                <Badge key={platform} className="bg-purple-100 text-purple-800">
                  {platform} Post
                </Badge>
              ))}
            </div>
          </div>

          {/* Compliance Confirmations */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Required Confirmations
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="permission"
                  checked={confirmChecks.hasPermission}
                  onCheckedChange={(checked) => 
                    setConfirmChecks(prev => ({...prev, hasPermission: checked}))
                  }
                />
                <label htmlFor="permission" className="text-sm leading-relaxed">
                  <strong>I have permission</strong> to contact all these people and they have opted in to receive communications from me about my business.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consequences"
                  checked={confirmChecks.understandsConsequences}
                  onCheckedChange={(checked) => 
                    setConfirmChecks(prev => ({...prev, understandsConsequences: checked}))
                  }
                />
                <label htmlFor="consequences" className="text-sm leading-relaxed">
                  <strong>I understand</strong> this will send messages to {contactCount.toLocaleString()} contacts and post to my connected social accounts.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="responsibility"
                  checked={confirmChecks.acceptsResponsibility}
                  onCheckedChange={(checked) => 
                    setConfirmChecks(prev => ({...prev, acceptsResponsibility: checked}))
                  }
                />
                <label htmlFor="responsibility" className="text-sm leading-relaxed">
                  <strong>I accept responsibility</strong> for all messages sent and will handle any responses professionally.
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm}
              disabled={!allChecked}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Zap className="w-5 h-5 mr-2" />
              Launch Viral Blast
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}