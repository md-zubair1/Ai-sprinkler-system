import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Battery, 
  Droplets, 
  Power,
  Settings,
  MoreVertical,
  Thermometer,
  Wind
} from "lucide-react";

interface StandData {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  battery: number;
  isActive: boolean;
  location: string;
  lastSpray: string;
  temperature: number;
  humidity: number;
  pesticidesRemaining: number;
}

const mockStands: StandData[] = [
  {
    id: "S001",
    name: "Stand Alpha-1",
    status: 'online',
    battery: 87,
    isActive: true,
    location: "Zone A-1",
    lastSpray: "2 hrs ago",
    temperature: 24,
    humidity: 68,
    pesticidesRemaining: 78
  },
  {
    id: "S002", 
    name: "Stand Beta-2",
    status: 'online',
    battery: 92,
    isActive: false,
    location: "Zone B-2", 
    lastSpray: "5 hrs ago",
    temperature: 26,
    humidity: 71,
    pesticidesRemaining: 45
  },
  {
    id: "S003",
    name: "Stand Gamma-3", 
    status: 'maintenance',
    battery: 15,
    isActive: false,
    location: "Zone C-1",
    lastSpray: "1 day ago",
    temperature: 23,
    humidity: 65,
    pesticidesRemaining: 12
  },
  {
    id: "S004",
    name: "Stand Delta-4",
    status: 'online',
    battery: 73,
    isActive: true,
    location: "Zone A-3",
    lastSpray: "30 min ago", 
    temperature: 25,
    humidity: 69,
    pesticidesRemaining: 89
  }
];

const StandControl = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-success/10 text-success border-success/20">Online</Badge>;
      case 'offline':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Offline</Badge>;
      case 'maintenance':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return "bg-success";
    if (battery > 30) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stand Control Center</h1>
            <p className="text-muted-foreground">Monitor and control individual sprinkler stands</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
            <Button>
              <Power className="w-4 h-4 mr-2" />
              Emergency Stop All
            </Button>
          </div>
        </div>

        {/* Stands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockStands.map((stand) => (
            <Card key={stand.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{stand.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{stand.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(stand.status)}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Control Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stand.isActive ? 'bg-success' : 'bg-muted-foreground'} ${stand.isActive ? 'animate-pulse' : ''}`} />
                    <span className="font-medium">
                      {stand.isActive ? 'Active Spraying' : 'Standby Mode'}
                    </span>
                  </div>
                  <Switch 
                    checked={stand.isActive && stand.status === 'online'} 
                    disabled={stand.status !== 'online'}
                  />
                </div>

                {/* Battery Level */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Battery className="w-4 h-4" />
                      Battery Level
                    </span>
                    <span className="text-sm font-bold">{stand.battery}%</span>
                  </div>
                  <Progress 
                    value={stand.battery} 
                    className="h-2"
                    style={{
                      background: `linear-gradient(to right, ${getBatteryColor(stand.battery)} 0%, ${getBatteryColor(stand.battery)} ${stand.battery}%, hsl(var(--muted)) ${stand.battery}%)`
                    }}
                  />
                </div>

                {/* Pesticide Level */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      Pesticide Level
                    </span>
                    <span className="text-sm font-bold">{stand.pesticidesRemaining}%</span>
                  </div>
                  <Progress 
                    value={stand.pesticidesRemaining} 
                    className="h-2 bg-primary/20"
                  />
                </div>

                {/* Environmental Data */}
                <div className="grid grid-cols-2 gap-4 p-3 rounded-lg border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Thermometer className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Temp</span>
                    </div>
                    <span className="text-sm font-bold">{stand.temperature}°C</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Wind className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Humidity</span>
                    </div>
                    <span className="text-sm font-bold">{stand.humidity}%</span>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="text-xs text-muted-foreground text-center">
                  Last spray: {stand.lastSpray}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={stand.status !== 'online'}
                  >
                    <Droplets className="w-3 h-3 mr-1" />
                    Manual Spray
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Diagnostics
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StandControl;