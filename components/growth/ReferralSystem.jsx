import React, { useState, useEffect } from 'react';
import { ReferralRequest } from "@/api/entities";
import { Lead } from "@/api/entities";
import { SendEmail } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Users, Send, TrendingUp, BarChart, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ReferralSystem({ user }) {
  const [requests, setRequests] = useState([]);
  const [pastClients, setPastClients] = useState([]);
  const [stats, setStats] = useState({ sent: 0, referrals: 0, conversion: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [reqs, closedLeads] = await Promise.all([
      ReferralRequest.filter({ realtor_email: user.email }),
      Lead.filter({ realtor_email: user.email, status: 'closed' })
    ]);
    
    setRequests(reqs);
    setPastClients(closedLeads.map(lead => ({ name: `${lead.first_name} ${lead.last_name}`, email: lead.email, id: lead.id })));
    
    const referralsGenerated = reqs.reduce((sum, r) => sum + r.referrals_generated, 0);
    setStats({
      sent: reqs.length,
      referrals: referralsGenerated,
      conversion: reqs.length > 0 ? (referralsGenerated / reqs.length * 100).toFixed(1) : 0
    });
    
    setIsLoading(false);
  };

  const handleSendRequest = async (client) => {
    // Prevent sending duplicate requests for the same transaction
    if (requests.some(r => r.related_transaction_id === client.id)) {
      alert("Referral request already sent for this transaction.");
      return;
    }

    const emailBody = `Hi ${client.name},

I hope you're doing wonderfully. It was such a pleasure helping you with your home, and I'm so glad we were able to achieve a great result together.

My business is built on helping great people like you, and your personal recommendation is the highest compliment I could receive.

If you know of any friends, family, or colleagues who could benefit from the same level of service and dedication, I would be incredibly grateful for an introduction. Who do you know that is thinking about buying or selling this year?

Thank you for your trust and support.

Best,
${user.full_name}`;

    try {
      await SendEmail({
        to: client.email,
        subject: `A quick favor from ${user.full_name}`,
        body: emailBody,
        from_name: user.full_name
      });

      await ReferralRequest.create({
        realtor_email: user.email,
        client_email: client.email,
        client_name: client.name,
        request_date: new Date().toISOString(),
        related_transaction_id: client.id
      });
      
      alert(`Referral request sent to ${client.name}!`);
      loadData();
    } catch (error) {
      console.error("Failed to send referral request", error);
      alert("Error sending request. Please try again.");
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-slate-900">
          <Gift className="w-6 h-6 text-teal-600" />
          Automated Referral System
        </CardTitle>
        <CardDescription>Turn your happy clients into your best source of new business.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-50">
            <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Send />Requests Sent</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.sent}</div></CardContent>
          </Card>
          <Card className="bg-slate-50">
            <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Users />Referrals Generated</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.referrals}</div></CardContent>
          </Card>
          <Card className="bg-slate-50">
            <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><TrendingUp />Conversion Rate</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.conversion}%</div></CardContent>
          </Card>
        </div>

        {/* Client List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Past Clients (Ready for Referral Request)</h3>
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading clients...</p>
            ) : pastClients.length === 0 ? (
              <p className="text-slate-500">No past closed clients found. Close some deals to start asking for referrals!</p>
            ) : (
              pastClients.map(client => {
                const alreadySent = requests.some(r => r.related_transaction_id === client.id);
                return (
                  <div key={client.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-slate-500">{client.email}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSendRequest(client)}
                      disabled={alreadySent}
                    >
                      {alreadySent ? <><CheckCircle className="w-4 h-4 mr-2" /> Sent</> : <><Send className="w-4 h-4 mr-2" /> Ask for Referral</>}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}