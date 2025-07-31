import React from 'react';

export const stripePaymentDescriptions = {
  starter: {
    monthly: {
      name: "AI Starter - Monthly",
      description: "For solo agents beginning their AI journey. Start smart. Grow fast.",
      price: 97,
      features: [
        "1,250 monthly credits included",
        "All 99+ AI features unlocked",
        "Connect 3 social media accounts", 
        "AI voice calls & SMS campaigns",
        "Email automation & sequences",
        "Basic analytics dashboard",
        "Community support",
        "No setup fee (was $1,497)"
      ],
      creditExamples: [
        "Generate ~75 social posts per month",
        "Make ~250 AI voice calls (1 min each)",
        "Send ~1,250 SMS messages",
        "Create 25+ lead magnets",
        "Generate 50+ email campaigns"
      ]
    },
    annual: {
      name: "AI Starter - Annual (4X Better Value!)",
      description: "For solo agents beginning their AI journey. Start smart. Grow fast. DOUBLE CREDITS with annual billing!",
      price: 47,
      originalPrice: 97,
      features: [
        "2,500 monthly credits (DOUBLE with annual!)",
        "All 99+ AI features unlocked",
        "Connect 3 social media accounts",
        "AI voice calls & SMS campaigns", 
        "Email automation & sequences",
        "Basic analytics dashboard",
        "Priority support",
        "No setup fee (was $1,497)",
        "Save $600/year vs monthly billing"
      ],
      creditExamples: [
        "Generate ~150 social posts per month",
        "Make ~500 AI voice calls (1 min each)",
        "Send ~2,500 SMS messages", 
        "Create 50+ lead magnets",
        "Generate 100+ email campaigns"
      ]
    }
  },
  
  accelerator: {
    monthly: {
      name: "AI Accelerator - Monthly",
      description: "For growth-minded agents. Boost productivity & automate more.",
      price: 197,
      features: [
        "2,500 monthly credits included",
        "Everything in AI Starter PLUS:",
        "Connect 5 social media accounts",
        "Custom brand voice training",
        "Priority support + live chat",
        "Advanced analytics & reporting",
        "Setup fee: $497 (was $2,497)"
      ],
      creditExamples: [
        "Generate ~150 social posts per month",
        "Make ~500 AI voice calls (1 min each)",
        "Send ~2,500 SMS messages",
        "Create 50+ lead magnets",
        "Generate 100+ email campaigns"
      ]
    },
    annual: {
      name: "AI Accelerator - Annual (4X Better Value!)",
      description: "For growth-minded agents. Boost productivity & automate more. DOUBLE CREDITS with annual billing!",
      price: 97,
      originalPrice: 197,
      features: [
        "5,000 monthly credits (DOUBLE with annual!)",
        "Everything in AI Starter PLUS:",
        "Connect 5 social media accounts",
        "Custom brand voice training",
        "Priority support + live chat",
        "Advanced analytics & reporting",
        "Setup fee: $497 (was $2,497)",
        "Save $1,200/year vs monthly billing"
      ],
      creditExamples: [
        "Generate ~300 social posts per month",
        "Make ~1,000 AI voice calls (1 min each)",
        "Send ~5,000 SMS messages",
        "Create 100+ lead magnets",
        "Generate 200+ email campaigns"
      ]
    }
  },

  powerhouse: {
    monthly: {
      name: "AI Powerhouse - Monthly",
      description: "For high-performance solo agents & small teams. Your personal AI army.",
      price: 297,
      features: [
        "7,500 monthly credits included",
        "Everything in AI Accelerator PLUS:",
        "Connect 10 social media accounts",
        "White-label branding options",
        "API access & custom integrations",
        "Dedicated success manager",
        "Setup fee: $597 (was $3,997)"
      ],
      creditExamples: [
        "Generate ~500 social posts per month",
        "Make ~1,500 AI voice calls (1 min each)",
        "Send ~7,500 SMS messages",
        "Create 150+ lead magnets",
        "Generate 300+ email campaigns"
      ]
    },
    annual: {
      name: "AI Powerhouse - Annual (4X Better Value!)",
      description: "For high-performance solo agents & small teams. Your personal AI army. DOUBLE CREDITS with annual billing!",
      price: 197,
      originalPrice: 297,
      features: [
        "15,000 monthly credits (DOUBLE with annual!)",
        "Everything in AI Accelerator PLUS:",
        "Connect 10 social media accounts",
        "White-label branding options",
        "API access & custom integrations",
        "Dedicated success manager",
        "Setup fee: $597 (was $3,997)",
        "Save $1,200/year vs monthly billing"
      ],
      creditExamples: [
        "Generate ~1,000 social posts per month",
        "Make ~3,000 AI voice calls (1 min each)",
        "Send ~15,000 SMS messages",
        "Create 300+ lead magnets",
        "Generate 600+ email campaigns"
      ]
    }
  },

  team: {
    monthly: {
      name: "AI Team Pro - Monthly",
      description: "Full stack AI suite for real estate teams. Multiply results. Maximize coordination.",
      price: 997,
      features: [
        "25,000 monthly credits included",
        "Everything in AI Powerhouse PLUS:",
        "5+ User Seats Included",
        "Centralized Billing & Reporting",
        "Team Performance Dashboards",
        "Advanced Lead Routing Rules",
        "Role-Based Permissions",
        "Shared Template Libraries",
        "Setup fee: $997 (was $4,997)"
      ],
      creditExamples: [
        "Power an entire brokerage",
        "Automate marketing for 5+ agents",
        "Generate ~1,500 social posts per month",
        "Make ~5,000 AI voice calls",
        "Send ~25,000 SMS messages"
      ]
    },
    annual: {
      name: "AI Team Pro - Annual (4X Better Value!)",
      description: "Full stack AI suite for real estate teams. Multiply results. Maximize coordination. DOUBLE CREDITS with annual billing!",
      price: 697,
      originalPrice: 997,
      features: [
        "50,000 monthly credits (DOUBLE with annual!)",
        "Everything in AI Powerhouse PLUS:",
        "5+ User Seats Included",
        "Centralized Billing & Reporting",
        "Team Performance Dashboards",
        "Advanced Lead Routing Rules",
        "Role-Based Permissions",
        "Shared Template Libraries",
        "Setup fee: $997 (was $4,997)",
        "Save $3,600/year vs monthly billing"
      ],
      creditExamples: [
        "Power multiple offices",
        "Automate marketing for 10+ agents",
        "Generate ~3,000 social posts per month",
        "Make ~10,000 AI voice calls",
        "Send ~50,000 SMS messages"
      ]
    }
  }
};

// Stripe Payment Link Templates
export const stripeDescriptionTemplates = {
  starter_monthly: `AI Starter Monthly Plan - $97/month

✅ 1,250 monthly credits included
✅ All 99+ AI features unlocked  
✅ Connect 3 social media accounts
✅ AI voice calls & SMS campaigns
✅ Email automation & sequences
✅ Basic analytics dashboard
✅ Community support
✅ No setup fee (was $1,497)

Perfect for solo agents starting their AI journey. Generate ~75 social posts, make ~250 AI voice calls, send ~1,250 SMS messages per month.

Beta Founders Price - Lock in this rate forever!`,

  starter_annual: `AI Starter Annual Plan - $47/month (billed annually)

🔥 DOUBLE CREDITS: 2,500 monthly credits!
✅ All 99+ AI features unlocked
✅ Connect 3 social media accounts  
✅ AI voice calls & SMS campaigns
✅ Email automation & sequences
✅ Priority support
✅ No setup fee (was $1,497)
💰 Save $600/year vs monthly billing

4X BETTER VALUE! Generate ~150 social posts, make ~500 AI voice calls, send ~2,500 SMS messages per month.

Beta Founders Price - Lock in this rate forever!`,

  accelerator_monthly: `AI Accelerator Monthly Plan - $197/month

✅ 2,500 monthly credits included
✅ Everything in AI Starter PLUS:
✅ Connect 5 social media accounts
✅ Custom brand voice training  
✅ Priority support + live chat
✅ Advanced analytics & reporting
✅ Setup fee: $497 (was $2,497)

For growth-minded agents. Generate ~150 social posts, make ~500 AI voice calls, send ~2,500 SMS messages per month.

Beta Founders Price - Lock in this rate forever!`,

  accelerator_annual: `AI Accelerator Annual Plan - $97/month (billed annually)  

🔥 DOUBLE CREDITS: 5,000 monthly credits!
✅ Everything in AI Starter PLUS:
✅ Connect 5 social media accounts
✅ Custom brand voice training
✅ Priority support + live chat  
✅ Advanced analytics & reporting
✅ Setup fee: $497 (was $2,497)
💰 Save $1,200/year vs monthly billing

4X BETTER VALUE! Generate ~300 social posts, make ~1,000 AI voice calls, send ~5,000 SMS messages per month.

Beta Founders Price - Lock in this rate forever!`,

  powerhouse_monthly: `AI Powerhouse Monthly Plan - $297/month

✅ 7,500 monthly credits included
✅ Everything in AI Accelerator PLUS:
✅ Connect 10 social media accounts
✅ White-label branding options
✅ API access & custom integrations  
✅ Dedicated success manager
✅ Setup fee: $597 (was $3,997)

Your personal AI army! Generate ~500 social posts, make ~1,500 AI voice calls, send ~7,500 SMS messages per month.

Beta Founders Price - Lock in this rate forever!`,

  powerhouse_annual: `AI Powerhouse Annual Plan - $197/month (billed annually)

🔥 DOUBLE CREDITS: 15,000 monthly credits!  
✅ Everything in AI Accelerator PLUS:
✅ Connect 10 social media accounts
✅ White-label branding options
✅ API access & custom integrations
✅ Dedicated success manager
✅ Setup fee: $597 (was $3,997)
💰 Save $1,200/year vs monthly billing

4X BETTER VALUE! Generate ~1,000 social posts, make ~3,000 AI voice calls, send ~15,000 SMS messages per month.

Beta Founders Price - Lock in this rate forever!`,

  team_monthly: `AI Team Pro Monthly Plan - $997/month

✅ 25,000 monthly credits included
✅ Everything in AI Powerhouse PLUS:
✅ 5+ User Seats Included
✅ Centralized Billing & Reporting
✅ Team Performance Dashboards
✅ Advanced Lead Routing Rules  
✅ Role-Based Permissions
✅ Shared Template Libraries
✅ Setup fee: $997 (was $4,997)

Full stack AI suite for teams. Power entire brokerages with ~1,500 social posts, ~5,000 AI voice calls, ~25,000 SMS per month.

Beta Founders Price - Lock in this rate forever!`,

  team_annual: `AI Team Pro Annual Plan - $697/month (billed annually)

🔥 DOUBLE CREDITS: 50,000 monthly credits!
✅ Everything in AI Powerhouse PLUS:  
✅ 5+ User Seats Included
✅ Centralized Billing & Reporting
✅ Team Performance Dashboards
✅ Advanced Lead Routing Rules
✅ Role-Based Permissions
✅ Shared Template Libraries
✅ Setup fee: $997 (was $4,997)
💰 Save $3,600/year vs monthly billing

4X BETTER VALUE! Power multiple offices with ~3,000 social posts, ~10,000 AI voice calls, ~50,000 SMS per month.

Beta Founders Price - Lock in this rate forever!`
};