import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Bug, 
  Activity, 
  AlertTriangle, 
  Zap,
  MapPin,
  TrendingUp,
  Thermometer,
  Wind
} from "lucide-react";
import Field3D from "@/components/Field3D";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriSmart Control</h1>
                <p className="text-sm text-muted-foreground">Intelligent Pesticide Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                System Online
              </Badge>
              <Button variant="outline" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Field Status
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-healthy/20 bg-gradient-to-br from-healthy/5 to-healthy/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Total Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-healthy">245.6 ha</div>
              <p className="text-sm text-muted-foreground">+12% from last season</p>
            </CardContent>
          </Card>

          <Card className="border-infected/20 bg-gradient-to-br from-infected/5 to-infected/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Infected Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-infected">12.3 ha</div>
              <p className="text-sm text-muted-foreground">-8% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Active Stands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">18/24</div>
              <p className="text-sm text-muted-foreground">6 stands in maintenance</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">3</div>
              <p className="text-sm text-muted-foreground">2 pest, 1 maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Field Visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                3D Field Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full">
                <Field3D />
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Environmental Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  Environment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Temperature</span>
                  <span className="font-medium">24°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Humidity</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    Wind Speed
                  </span>
                  <span className="font-medium">12 km/h</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Stand #12 completed spray cycle</p>
                    <p className="text-xs text-muted-foreground">Zone B-3 • 2 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-infected rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pest detection in Zone A-7</p>
                    <p className="text-xs text-muted-foreground">AI Confidence: 94% • 15 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Stand #5 low battery alert</p>
                    <p className="text-xs text-muted-foreground">Battery: 15% • 1 hr ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button className="w-full" variant="default">
                <Droplets className="w-4 h-4 mr-2" />
                Start Emergency Spray
              </Button>
              <Button className="w-full" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;