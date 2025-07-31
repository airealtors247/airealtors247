import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Users } from "lucide-react";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
  "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", 
  "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor-Leste)", 
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", 
  "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
  "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
  "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", 
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", 
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", 
  "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", 
  "Zimbabwe"
];

const categories = [
  "Real Estate Investors (Flippers, Wholesalers)",
  "Mortgage Brokers", 
  "Property Managers",
  "Home Inspectors",
  "Title & Escrow Agents",
  "Chiropractors",
  "Dentists",
  "Medical Aesthetics Clinics", 
  "Physical Therapists",
  "Health Coaches / Wellness Coaches",
  "Psychologists / Therapists",
  "Med Spa Owners",
  "Personal Trainers / Gyms",
  "Lawyers / Law Firms",
  "Immigration Consultants",
  "Accountants / CPAs",
  "Financial Advisors",
  "Bookkeepers", 
  "Tax Preparers",
  "Insurance Agents",
  "General Contractors",
  "Roofers",
  "Plumbers",
  "Electricians", 
  "HVAC Professionals",
  "Landscapers",
  "Handymen",
  "Cleaning Companies",
  "Pool Maintenance",
  "Pest Control",
  "Salon Owners",
  "Barbers",
  "Lash Technicians",
  "Nail Techs",
  "Tattoo Artists",
  "Massage Therapists",
  "Permanent Makeup Artists",
  "Marketing Consultants",
  "Web Designers",
  "SEO Agencies",
  "Graphic Designers",
  "Videographers",
  "Branding Coaches",
  "Funnel Builders",
  "Business Coaches",
  "Sales Trainers",
  "Virtual Assistants",
  "Career Coaches",
  "Life Coaches",
  "Freelancers (Copywriters, Designers, Developers)",
  "Recruiters / Staffing Agencies",
  "Boutique Store Owners",
  "Pet Groomers",
  "Auto Detailers",
  "Mobile Car Wash",
  "Photographers",
  "Event Planners",
  "Wedding Coordinators",
  "Tutors",
  "Online Course Creators",
  "Consultants",
  "College Admissions Coaches",
  "Investment Coaches"
];

export default function InfluencerSearchForm({ onSearch, isLoading }) {
  const [searchData, setSearchData] = useState({
    category: "Business Coaches",
    country: "United States",
    followerCount: "10000",
    specificRequirements: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="w-5 h-5" />
          AI Influencer Discovery
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Target Category
              </label>
              <Select value={searchData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-slate-600">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Target Country
              </label>
              <Select value={searchData.country} onValueChange={(value) => handleChange('country', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 max-h-60">
                  {countries.map(country => (
                    <SelectItem key={country} value={country} className="text-white hover:bg-slate-600">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Minimum Follower Count
            </label>
            <Select value={searchData.followerCount} onValueChange={(value) => handleChange('followerCount', value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="1000" className="text-white hover:bg-slate-600">1K+ followers</SelectItem>
                <SelectItem value="5000" className="text-white hover:bg-slate-600">5K+ followers</SelectItem>
                <SelectItem value="10000" className="text-white hover:bg-slate-600">10K+ followers</SelectItem>
                <SelectItem value="50000" className="text-white hover:bg-slate-600">50K+ followers</SelectItem>
                <SelectItem value="100000" className="text-white hover:bg-slate-600">100K+ followers</SelectItem>
                <SelectItem value="500000" className="text-white hover:bg-slate-600">500K+ followers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Additional Requirements
            </label>
            <Textarea 
              placeholder="e.g., Must post regularly about business tips, have high engagement rates, focus on local market..."
              value={searchData.specificRequirements}
              onChange={(e) => handleChange('specificRequirements', e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching for Influencers...
              </>
            ) : (
              <>
                <Users className="w-4 h-4 mr-2" />
                Find Influencers
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}