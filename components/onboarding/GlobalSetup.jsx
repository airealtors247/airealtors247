import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, MapPin, MessageSquare, Shield, CreditCard } from "lucide-react";

const countries = [
    { code: "US", name: "United States", currency: "USD", languages: ["en", "es"] },
    { code: "CA", name: "Canada", currency: "CAD", languages: ["en", "fr"] },
    { code: "UK", name: "United Kingdom", currency: "GBP", languages: ["en"] },
    { code: "AU", name: "Australia", currency: "AUD", languages: ["en"] },
    { code: "NZ", name: "New Zealand", currency: "NZD", languages: ["en"] },
    { code: "IE", name: "Ireland", currency: "EUR", languages: ["en", "ga"] },
    { code: "ZA", name: "South Africa", currency: "ZAR", languages: ["en", "af", "zu", "xh"] },
    { code: "SG", name: "Singapore", currency: "SGD", languages: ["en", "zh", "ms", "ta"] },
    { code: "HK", name: "Hong Kong", currency: "HKD", languages: ["en", "zh"] },
    { code: "MY", name: "Malaysia", currency: "MYR", languages: ["en", "ms", "zh", "ta"] },
    { code: "IN", name: "India", currency: "INR", languages: ["en", "hi", "bn", "te", "mr", "ta", "gu", "ur", "kn", "or", "ml", "pa"] },
    { code: "PH", name: "Philippines", currency: "PHP", languages: ["en", "tl"] },
    { code: "TH", name: "Thailand", currency: "THB", languages: ["th", "en"] },
    { code: "ID", name: "Indonesia", currency: "IDR", languages: ["id", "en"] },
    { code: "VN", name: "Vietnam", currency: "VND", languages: ["vi", "en"] },
    { code: "DE", name: "Germany", currency: "EUR", languages: ["de", "en"] },
    { code: "FR", name: "France", currency: "EUR", languages: ["fr", "en"] },
    { code: "ES", name: "Spain", currency: "EUR", languages: ["es", "en"] },
    { code: "IT", name: "Italy", currency: "EUR", languages: ["it", "en"] },
    { code: "NL", name: "Netherlands", currency: "EUR", languages: ["nl", "en"] },
    { code: "BE", name: "Belgium", currency: "EUR", languages: ["nl", "fr", "de", "en"] },
    { code: "AT", name: "Austria", currency: "EUR", languages: ["de", "en"] },
    { code: "CH", name: "Switzerland", currency: "CHF", languages: ["de", "fr", "it", "en"] },
    { code: "SE", name: "Sweden", currency: "SEK", languages: ["sv", "en"] },
    { code: "NO", name: "Norway", currency: "NOK", languages: ["no", "en"] },
    { code: "DK", name: "Denmark", currency: "DKK", languages: ["da", "en"] },
    { code: "FI", name: "Finland", currency: "EUR", languages: ["fi", "sv", "en"] },
    { code: "PL", name: "Poland", currency: "PLN", languages: ["pl", "en"] },
    { code: "CZ", name: "Czech Republic", currency: "CZK", languages: ["cs", "en"] },
    { code: "PT", name: "Portugal", currency: "EUR", languages: ["pt", "en"] },
    { code: "MX", name: "Mexico", currency: "MXN", languages: ["es", "en"] },
    { code: "BR", name: "Brazil", currency: "BRL", languages: ["pt", "en"] },
    { code: "AR", name: "Argentina", currency: "ARS", languages: ["es", "en"] },
    { code: "CO", name: "Colombia", currency: "COP", languages: ["es", "en"] },
    { code: "CL", name: "Chile", currency: "CLP", languages: ["es", "en"] },
    { code: "PE", name: "Peru", currency: "PEN", languages: ["es", "en"] },
    { code: "UY", name: "Uruguay", currency: "UYU", languages: ["es", "en"] },
    { code: "CR", name: "Costa Rica", currency: "CRC", languages: ["es", "en"] },
    { code: "PA", name: "Panama", currency: "PAB", languages: ["es", "en"] },
    { code: "GT", name: "Guatemala", currency: "GTQ", languages: ["es", "en"] },
    { code: "DO", name: "Dominican Republic", currency: "DOP", languages: ["es", "en"] },
    { code: "PR", name: "Puerto Rico", currency: "USD", languages: ["es", "en"] },
    { code: "AE", name: "United Arab Emirates", currency: "AED", languages: ["ar", "en"] },
    { code: "SA", name: "Saudi Arabia", currency: "SAR", languages: ["ar", "en"] },
    { code: "QA", name: "Qatar", currency: "QAR", languages: ["ar", "en"] },
    { code: "KW", name: "Kuwait", currency: "KWD", languages: ["ar", "en"] },
    { code: "BH", name: "Bahrain", currency: "BHD", languages: ["ar", "en"] },
    { code: "OM", name: "Oman", currency: "OMR", languages: ["ar", "en"] },
    { code: "JO", name: "Jordan", currency: "JOD", languages: ["ar", "en"] },
    { code: "LB", name: "Lebanon", currency: "LBP", languages: ["ar", "en", "fr"] },
    { code: "EG", name: "Egypt", currency: "EGP", languages: ["ar", "en"] },
    { code: "MA", name: "Morocco", currency: "MAD", languages: ["ar", "fr", "en"] },
    { code: "TN", name: "Tunisia", currency: "TND", languages: ["ar", "fr", "en"] },
    { code: "KE", name: "Kenya", currency: "KES", languages: ["en", "sw"] },
    { code: "NG", name: "Nigeria", currency: "NGN", languages: ["en", "ha", "yo", "ig"] },
    { code: "GH", name: "Ghana", currency: "GHS", languages: ["en"] },
    { code: "JP", name: "Japan", currency: "JPY", languages: ["ja", "en"] },
    { code: "KR", name: "South Korea", currency: "KRW", languages: ["ko", "en"] },
    { code: "TW", name: "Taiwan", currency: "TWD", languages: ["zh", "en"] },
    { code: "CN", name: "China", currency: "CNY", languages: ["zh", "en"] },
    { code: "RU", name: "Russia", currency: "RUB", languages: ["ru", "en"] },
    { code: "TR", name: "Turkey", currency: "TRY", languages: ["tr", "en"] },
    { code: "IL", name: "Israel", currency: "ILS", languages: ["he", "ar", "en"] },
    { code: "GR", name: "Greece", currency: "EUR", languages: ["el", "en"] },
    { code: "CY", name: "Cyprus", currency: "EUR", languages: ["el", "tr", "en"] },
    { code: "MT", name: "Malta", currency: "EUR", languages: ["mt", "en"] },
    { code: "LU", name: "Luxembourg", currency: "EUR", languages: ["lb", "fr", "de", "en"] },
    { code: "IS", name: "Iceland", currency: "ISK", languages: ["is", "en"] }
];

const languageNames = {
    en: "English", es: "Español", fr: "Français", de: "Deutsch", it: "Italiano", pt: "Português",
    nl: "Nederlands", sv: "Svenska", no: "Norsk", da: "Dansk", fi: "Suomi", pl: "Polski",
    cs: "Čeština", ru: "Русский", uk: "Українська", tr: "Türkçe", ar: "العربية", he: "עברית",
    zh: "中文", ja: "日本語", ko: "한국어", hi: "हिन्दी", th: "ไทย", vi: "Tiếng Việt",
    id: "Bahasa Indonesia", ms: "Bahasa Melayu", tl: "Filipino", ta: "தமிழ்", bn: "বাংলা",
    te: "తెలుగు", mr: "मराठी", gu: "ગુજરાતી", kn: "ಕನ್ನಡ", ml: "മലയാളം", pa: "ਪੰਜਾਬੀ",
    or: "ଓଡ଼ିଆ", ur: "اردو", sw: "Kiswahili", ha: "Hausa", yo: "Yorùbá", ig: "Igbo",
    zu: "isiZulu", xh: "isiXhosa", af: "Afrikaans", el: "Ελληνικά", mt: "Malti",
    ga: "Gaeilge", cy: "Cymraeg", is: "Íslenska", lb: "Lëtzebuergesch"
};

export default function GlobalSetup({ onComplete, initialData = {} }) {
    const [formData, setFormData] = useState({
        country: initialData.country || '',
        language: initialData.language || 'en',
        currency: initialData.currency || 'USD',
        timezone: initialData.timezone || '',
        compliance_settings: {
            gdpr_consent: false,
            marketing_consent: false,
            data_retention_period: 365,
            ...initialData.compliance_settings
        },
        local_real_estate_regulations: {
            license_required: true,
            license_number: '',
            regulatory_body: '',
            ...initialData.local_real_estate_regulations
        },
        content_preferences: {
            multilingual_content: false,
            auto_translate: true,
            cultural_sensitivity: 'moderate',
            ...initialData.content_preferences
        }
    });

    const selectedCountry = countries.find(c => c.code === formData.country);
    const availableLanguages = selectedCountry?.languages || ['en'];

    const handleCountryChange = (countryCode) => {
        const country = countries.find(c => c.code === countryCode);
        setFormData(prev => ({
            ...prev,
            country: countryCode,
            currency: country.currency,
            language: country.languages[0] // Default to first available language
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete(formData);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Globe className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Global Market Setup</h2>
                <p className="text-slate-600">Configure AIRealtors247 for your local market and compliance requirements</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            Location & Language
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Country/Market</label>
                                <Select value={formData.country} onValueChange={handleCountryChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                        {countries.map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Primary Language</label>
                                <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({...prev, language: value}))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableLanguages.map((lang) => (
                                            <SelectItem key={lang} value={lang}>
                                                {languageNames[lang] || lang.toUpperCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Currency</label>
                                <Input value={formData.currency} disabled className="bg-slate-50" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Timezone</label>
                                <Input 
                                    value={formData.timezone}
                                    onChange={(e) => setFormData(prev => ({...prev, timezone: e.target.value}))}
                                    placeholder="e.g. America/New_York, Europe/London"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            Legal & Compliance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Real Estate License Number</label>
                            <Input 
                                value={formData.local_real_estate_regulations.license_number}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev, 
                                    local_real_estate_regulations: {
                                        ...prev.local_real_estate_regulations,
                                        license_number: e.target.value
                                    }
                                }))}
                                placeholder="Enter your license number"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Regulatory Body</label>
                            <Input 
                                value={formData.local_real_estate_regulations.regulatory_body}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev, 
                                    local_real_estate_regulations: {
                                        ...prev.local_real_estate_regulations,
                                        regulatory_body: e.target.value
                                    }
                                }))}
                                placeholder="e.g. NAR, RERA, FCA, ASIC"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="gdpr"
                                    checked={formData.compliance_settings.gdpr_consent}
                                    onCheckedChange={(checked) => setFormData(prev => ({
                                        ...prev,
                                        compliance_settings: {
                                            ...prev.compliance_settings,
                                            gdpr_consent: checked
                                        }
                                    }))}
                                />
                                <label htmlFor="gdpr" className="text-sm text-slate-700">
                                    I consent to GDPR/CCPA compliant data processing
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="marketing"
                                    checked={formData.compliance_settings.marketing_consent}
                                    onCheckedChange={(checked) => setFormData(prev => ({
                                        ...prev,
                                        compliance_settings: {
                                            ...prev.compliance_settings,
                                            marketing_consent: checked
                                        }
                                    }))}
                                />
                                <label htmlFor="marketing" className="text-sm text-slate-700">
                                    I consent to marketing communications and analytics
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                            Content Preferences
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="multilingual"
                                    checked={formData.content_preferences.multilingual_content}
                                    onCheckedChange={(checked) => setFormData(prev => ({
                                        ...prev,
                                        content_preferences: {
                                            ...prev.content_preferences,
                                            multilingual_content: checked
                                        }
                                    }))}
                                />
                                <label htmlFor="multilingual" className="text-sm text-slate-700">
                                    Generate content in multiple languages for my market
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="auto-translate"
                                    checked={formData.content_preferences.auto_translate}
                                    onCheckedChange={(checked) => setFormData(prev => ({
                                        ...prev,
                                        content_preferences: {
                                            ...prev.content_preferences,
                                            auto_translate: checked
                                        }
                                    }))}
                                />
                                <label htmlFor="auto-translate" className="text-sm text-slate-700">
                                    Automatically translate content to local languages
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Cultural Sensitivity</label>
                            <Select 
                                value={formData.content_preferences.cultural_sensitivity}
                                onValueChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    content_preferences: {
                                        ...prev.content_preferences,
                                        cultural_sensitivity: value
                                    }
                                }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="conservative">Conservative - Very culturally aware</SelectItem>
                                    <SelectItem value="moderate">Moderate - Balanced approach</SelectItem>
                                    <SelectItem value="progressive">Progressive - Modern and inclusive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
                        Complete Global Setup
                    </Button>
                </div>
            </form>
        </div>
    );
}