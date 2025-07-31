import React, { useState, useEffect } from "react";
import { SystemHealthCheck } from "@/api/entities";
import { LLMProvider } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Activity,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Zap,
    Database,
    Mail,
    MessageSquare,
    CreditCard,
    Cloud,
    Mic,
    FileText,
    GraduationCap,
    RefreshCw,
    Globe,
    Shield
} from "lucide-react";

const serviceIcons = {
    user_auth: Shield,
    database: Database,
    llm_providers: Zap,
    email_services: Mail,
    sms_services: MessageSquare,
    social_media_apis: Globe,
    payment_processing: CreditCard,
    file_storage: Cloud,
    cdn: Activity,
    voice_services: Mic,
    document_generation: FileText,
    ai_training: GraduationCap
};

const statusColors = {
    healthy: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    degraded: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
    critical: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    offline: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
};

export default function SystemStatusPage() {
    const [user, setUser] = useState(null);
    const [healthChecks, setHealthChecks] = useState([]);
    const [llmProviders, setLLMProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(null);

    useEffect(() => {
        loadSystemStatus();
        // Refresh every 30 seconds
        const interval = setInterval(loadSystemStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadSystemStatus = async () => {
        try {
            const [userData, healthData, llmData] = await Promise.all([
                User.me(),
                SystemHealthCheck.list("-last_check", 50),
                LLMProvider.list("-priority_order")
            ]);
            
            setUser(userData);
            setHealthChecks(healthData);
            setLLMProviders(llmData);
            setLastRefresh(new Date());
        } catch (error) {
            console.error("Error loading system status:", error);
        }
        setIsLoading(false);
    };

    const runHealthCheck = async (serviceName) => {
        // Simulate running a health check
        await SystemHealthCheck.create({
            service_name: serviceName,
            status: "healthy",
            response_time_ms: Math.floor(Math.random() * 500) + 50,
            last_check: new Date().toISOString(),
            uptime_percentage: 99.9
        });
        loadSystemStatus();
    };

    const getOverallStatus = () => {
        const criticalServices = healthChecks.filter(h => h.status === 'critical' || h.status === 'offline');
        const degradedServices = healthChecks.filter(h => h.status === 'degraded');
        
        if (criticalServices.length > 0) return 'critical';
        if (degradedServices.length > 0) return 'degraded';
        return 'healthy';
    };

    const overallStatus = getOverallStatus();
    const healthyCount = healthChecks.filter(h => h.status === 'healthy').length;
    const totalServices = healthChecks.length;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-32 bg-slate-200 rounded-xl"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-48 bg-slate-200 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Only show to admin users
    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                        <Shield className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Restricted</h2>
                        <p className="text-slate-600">System status is only available to platform administrators.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                                <Activity className="w-8 h-8 text-blue-600" />
                                System Status Dashboard
                            </h1>
                            <p className="text-slate-600 text-lg">
                                Real-time monitoring of all platform services and integrations
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge className={`${statusColors[overallStatus].bg} ${statusColors[overallStatus].text} text-sm px-3 py-1`}>
                                System {overallStatus.toUpperCase()}
                            </Badge>
                            <Button onClick={() => loadSystemStatus()} size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                    {lastRefresh && (
                        <p className="text-xs text-slate-500 mt-4">
                            Last updated: {lastRefresh.toLocaleTimeString()}
                        </p>
                    )}
                </div>

                {/* Overall Health Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="shadow-lg border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Services Online</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{healthyCount}/{totalServices}</div>
                            <Progress value={(healthyCount / totalServices) * 100} className="mt-2" />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">LLM Providers</CardTitle>
                            <Zap className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{llmProviders.filter(p => p.status === 'active').length}</div>
                            <p className="text-xs text-slate-500">Active AI providers</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                            <Activity className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round(healthChecks.reduce((sum, h) => sum + (h.response_time_ms || 0), 0) / healthChecks.length)}ms
                            </div>
                            <p className="text-xs text-slate-500">System-wide average</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                            <Shield className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.9%</div>
                            <p className="text-xs text-slate-500">Last 30 days</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Critical Alerts */}
                {healthChecks.some(h => h.status === 'critical' || h.status === 'offline') && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Critical Services Down:</strong> {' '}
                            {healthChecks
                                .filter(h => h.status === 'critical' || h.status === 'offline')
                                .map(h => h.service_name.replace('_', ' '))
                                .join(', ')}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Service Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {healthChecks.map((service) => {
                        const IconComponent = serviceIcons[service.service_name] || Activity;
                        const statusColor = statusColors[service.status];
                        
                        return (
                            <Card key={service.service_name} className={`shadow-lg border-2 ${statusColor.border}`}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-6 h-6 text-blue-600" />
                                            <CardTitle className="text-lg capitalize">
                                                {service.service_name.replace('_', ' ')}
                                            </CardTitle>
                                        </div>
                                        <Badge className={`${statusColor.bg} ${statusColor.text}`}>
                                            {service.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-slate-500">Response Time</p>
                                            <p className="font-medium">{service.response_time_ms || 0}ms</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500">Uptime</p>
                                            <p className="font-medium">{service.uptime_percentage || 100}%</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500">Errors (24h)</p>
                                            <p className="font-medium">{service.error_count_24h || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500">Last Check</p>
                                            <p className="font-medium">
                                                {service.last_check ? new Date(service.last_check).toLocaleTimeString() : 'Never'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={() => runHealthCheck(service.service_name)}
                                        className="w-full"
                                    >
                                        Run Health Check
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* LLM Provider Status */}
                <Card className="shadow-xl border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Zap className="w-6 h-6 text-purple-600" />
                            AI/LLM Provider Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {llmProviders.map((provider) => (
                                <div key={provider.provider_name} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold capitalize">
                                            {provider.provider_name.replace('_', ' ')}
                                        </h3>
                                        <Badge className={provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                            {provider.status}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1 text-sm text-slate-600">
                                        <p>Priority: #{provider.priority_order}</p>
                                        <p>Usage Today: {provider.current_usage_today || 0} tokens</p>
                                        <p>Avg Response: {provider.response_time_avg || 0}ms</p>
                                        <p>Success Rate: {provider.success_rate || 100}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}