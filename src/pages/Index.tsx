import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import StandControl from "@/components/StandControl";
import SprayLogs from "@/components/SprayLogs";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Bell,
  AlertTriangle,
  CheckCircle,
  Settings
} from "lucide-react";

const AlertsPage = () => {
  const alerts = [
    {
      id: 1,
      type: 'pest',
      title: 'High aphid concentration detected',
      description: 'Zone A-7 showing 94% confidence of aphid infestation',
      timestamp: '15 min ago',
      severity: 'high',
      resolved: false
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Stand #5 requires battery replacement',
      description: 'Battery level critical at 15%. Schedule maintenance soon.',
      timestamp: '1 hr ago',
      severity: 'medium',
      resolved: false
    },
    {
      id: 3,
      type: 'pest',
      title: 'Spider mites detected in Zone B-3',
      description: 'AI detected spider mite presence. Treatment recommended.',
      timestamp: '2 hrs ago',
      severity: 'high',
      resolved: true
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case 'low':
        return <Badge className="bg-info/10 text-info border-info/20">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Monitor system alerts and pest detections</p>
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Alert Settings
          </Button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 ${alert.resolved ? 'text-success' : 'text-destructive'}`}>
                    {alert.resolved ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{alert.title}</h3>
                      {getSeverityBadge(alert.severity)}
                      {alert.resolved && <Badge className="bg-success/10 text-success border-success/20">Resolved</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-2">{alert.description}</p>
                    <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
                {!alert.resolved && (
                  <Button size="sm">
                    Resolve
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stands':
        return <StandControl />;
      case 'logs':
        return <SprayLogs />;
      case 'alerts':
        return <AlertsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriSmart Control</h1>
                <p className="text-sm text-muted-foreground">Intelligent Pesticide Management System</p>
              </div>
            </div>
            
            {/* Navigation */}
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                System Online
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
