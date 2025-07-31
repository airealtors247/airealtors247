
import React, { useState, useEffect } from 'react';
import { Goal } from "@/api/entities";
import { Lead } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Plus, Goal as GoalIcon, BarChart, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

export default function GoalSetter({ user }) {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_type: "total_transactions",
    target_value: 12,
    end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  });
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setIsLoading(true);
    const userGoals = await Goal.filter({ realtor_email: user.email });
    setGoals(userGoals);
    setIsLoading(false);
  };

  const handleSetGoal = async () => {
    setIsGeneratingPlan(true);

    const closedLeads = await Lead.filter({ realtor_email: user.email, status: 'closed' });
    const totalLeads = await Lead.filter({ realtor_email: user.email });

    const conversionRate = totalLeads.length > 0 ? (closedLeads.length / totalLeads.length) * 100 : 5; // Default 5%
    const avgGCI = closedLeads.reduce((sum, lead) => sum + (lead.budget_max || 0) * 0.025, 0) / (closedLeads.length || 1);

    const prompt = `As an expert real estate business coach, create a strategic achievement plan for a realtor with the following goal:
Goal Type: ${newGoal.goal_type}
Target Value: ${newGoal.target_value}
End Date: ${newGoal.end_date}

Current Realtor Stats:
- Conversion Rate: ${conversionRate.toFixed(2)}%
- Average GCI per deal: $${avgGCI.toFixed(0)}
- Current Subscription Plan: ${user.subscription_tier}

Based on this, reverse-engineer a plan. Calculate the required monthly leads. Suggest specific campaigns from the AIRealtors247 platform (e.g., 'Market Report Lead Magnet', 'Facebook Seller Campaign'). Recommend specific actions.
Finally, analyze if their current subscription tier is sufficient. If not, recommend a specific upgrade and explain why.
Structure the output as a JSON object with keys: "summary", "required_monthly_leads", "suggested_campaigns" (array), "recommended_actions" (array), "plan_recommendation". Include a strong, clear disclaimer that results are not guaranteed.`;

    const plan = await InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          summary: { type: "string" },
          required_monthly_leads: { type: "number" },
          suggested_campaigns: { type: "array", items: { type: "string" } },
          recommended_actions: { type: "array", items: { type: "string" } },
          plan_recommendation: { type: "string" }
        }
      }
    });
    
    plan.disclaimer = "This is a strategic forecast based on industry averages and your current data. Market conditions, lead quality, and individual effort will impact your actual results. This plan is a roadmap, not a guarantee of income or success.";

    await Goal.create({
      ...newGoal,
      realtor_email: user.email,
      start_date: new Date().toISOString().split('T')[0],
      ai_achievement_plan: plan
    });

    setIsGeneratingPlan(false);
    setShowForm(false);
    loadGoals();
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-slate-900">
          <GoalIcon className="w-6 h-6 text-green-600" />
          AI Goal Coach
        </CardTitle>
        <CardDescription>Set your business goals, and let our AI build a strategic roadmap to help you achieve them.</CardDescription>
      </CardHeader>
      <CardContent>
        {goals.map(goal => (
          <Card key={goal.id} className="mb-6 bg-slate-50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="capitalize">{goal.goal_type.replace(/_/g, ' ')}</CardTitle>
                  <CardDescription>Target: {goal.target_value.toLocaleString()} by {new Date(goal.end_date).toLocaleDateString()}</CardDescription>
                </div>
                <Badge variant={goal.status === 'achieved' ? 'default' : 'secondary'}>{goal.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Progress value={(goal.current_progress / goal.target_value) * 100} className="w-full" />
                <span className="font-semibold text-slate-700">
                  {((goal.current_progress / goal.target_value) * 100).toFixed(0)}%
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200 mt-4 space-y-4">
                <h4 className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> AI Achievement Plan</h4>
                <p className="text-sm text-slate-600">{goal.ai_achievement_plan?.summary}</p>
                <ul className="text-sm space-y-2">
                  {goal.ai_achievement_plan?.recommended_actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
                {goal.ai_achievement_plan?.plan_recommendation && (
                  <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                    <AlertDescription>{goal.ai_achievement_plan.plan_recommendation}</AlertDescription>
                  </Alert>
                )}
                <Alert variant="destructive" className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800 text-xs">
                    {goal.ai_achievement_plan?.disclaimer}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        ))}

        {!showForm && (
          <div className="text-center py-6">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Set a New Goal
            </Button>
          </div>
        )}

        {showForm && (
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Select onValueChange={(v) => setNewGoal(g => ({...g, goal_type: v}))} defaultValue={newGoal.goal_type}>
                <SelectTrigger><SelectValue placeholder="Goal Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="total_transactions">Total Transactions</SelectItem>
                  <SelectItem value="gci_earned">GCI Earned ($)</SelectItem>
                  <SelectItem value="listings_closed">Listings Closed</SelectItem>
                  <SelectItem value="buyer_deals_closed">Buyer Deals Closed</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Target Value"
                value={newGoal.target_value}
                onChange={(e) => setNewGoal(g => ({...g, target_value: Number(e.target.value)}))}
              />
              <Input
                type="date"
                value={newGoal.end_date}
                onChange={(e) => setNewGoal(g => ({...g, end_date: e.target.value}))}
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSetGoal} disabled={isGeneratingPlan}>
                {isGeneratingPlan ? 'Building Your Plan...' : 'Set Goal & Generate AI Plan'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
