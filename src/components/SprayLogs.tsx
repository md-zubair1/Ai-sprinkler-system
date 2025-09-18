import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar, 
  Download, 
  Filter,
  Search,
  Droplets,
  MapPin,
  Clock,
  TrendingUp,
  BarChart3
} from "lucide-react";

interface SprayLog {
  id: string;
  timestamp: string;
  standId: string;
  standName: string;
  zone: string;
  duration: number; // minutes
  pesticidesUsed: number; // liters
  coverage: number; // hectares
  effectiveness: number; // percentage
  trigger: 'manual' | 'auto' | 'scheduled';
  pestType: string;
}

const mockLogs: SprayLog[] = [
  {
    id: "LOG001",
    timestamp: "2024-01-15 14:30:22",
    standId: "S001",
    standName: "Stand Alpha-1",
    zone: "Zone A-1",
    duration: 12,
    pesticidesUsed: 2.4,
    coverage: 1.8,
    effectiveness: 94,
    trigger: 'auto',
    pestType: "Aphids"
  },
  {
    id: "LOG002",
    timestamp: "2024-01-15 13:15:45",
    standId: "S004",
    standName: "Stand Delta-4", 
    zone: "Zone A-3",
    duration: 8,
    pesticidesUsed: 1.6,
    coverage: 1.2,
    effectiveness: 87,
    trigger: 'auto',
    pestType: "Whiteflies"
  },
  {
    id: "LOG003", 
    timestamp: "2024-01-15 11:45:12",
    standId: "S002",
    standName: "Stand Beta-2",
    zone: "Zone B-2",
    duration: 15,
    pesticidesUsed: 3.2,
    coverage: 2.1,
    effectiveness: 91,
    trigger: 'manual',
    pestType: "Spider Mites"
  },
  {
    id: "LOG004",
    timestamp: "2024-01-15 09:20:33",
    standId: "S001", 
    standName: "Stand Alpha-1",
    zone: "Zone A-1",
    duration: 10,
    pesticidesUsed: 2.0,
    coverage: 1.5,
    effectiveness: 89,
    trigger: 'scheduled',
    pestType: "Thrips"
  },
  {
    id: "LOG005",
    timestamp: "2024-01-14 16:55:18",
    standId: "S003",
    standName: "Stand Gamma-3",
    zone: "Zone C-1", 
    duration: 18,
    pesticidesUsed: 4.1,
    coverage: 2.8,
    effectiveness: 96,
    trigger: 'auto',
    pestType: "Caterpillars"
  }
];

const SprayLogs = () => {
  const getTriggerBadge = (trigger: string) => {
    switch (trigger) {
      case 'auto':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Auto</Badge>;
      case 'manual':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Manual</Badge>;
      case 'scheduled':
        return <Badge className="bg-info/10 text-info border-info/20">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{trigger}</Badge>;
    }
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return "text-success";
    if (effectiveness >= 75) return "text-warning";
    return "text-destructive";
  };

  const totalPesticidesUsed = mockLogs.reduce((sum, log) => sum + log.pesticidesUsed, 0);
  const totalCoverage = mockLogs.reduce((sum, log) => sum + log.coverage, 0);
  const avgEffectiveness = mockLogs.reduce((sum, log) => sum + log.effectiveness, 0) / mockLogs.length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Spray Logs & History</h1>
            <p className="text-muted-foreground">Complete record of all spraying activities</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Total Pesticides Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalPesticidesUsed.toFixed(1)}L</div>
              <p className="text-sm text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="border-healthy/20 bg-gradient-to-br from-healthy/5 to-healthy/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Area Covered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-healthy">{totalCoverage.toFixed(1)} ha</div>
              <p className="text-sm text-muted-foreground">Across all zones</p>
            </CardContent>
          </Card>

          <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Avg Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-info">{avgEffectiveness.toFixed(0)}%</div>
              <p className="text-sm text-muted-foreground">Treatment success rate</p>
            </CardContent>
          </Card>

          <Card className="border-muted bg-gradient-to-br from-muted/5 to-muted/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Total Spray Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{mockLogs.length}</div>
              <p className="text-sm text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search by stand name, zone, or pest type..." 
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Spray Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Stand & Zone</TableHead>
                  <TableHead>Pest Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Pesticides Used</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Effectiveness</TableHead>
                  <TableHead>Trigger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.standName}</div>
                        <div className="text-sm text-muted-foreground">{log.zone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.pestType}</Badge>
                    </TableCell>
                    <TableCell>{log.duration} min</TableCell>
                    <TableCell>{log.pesticidesUsed}L</TableCell>
                    <TableCell>{log.coverage} ha</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getEffectivenessColor(log.effectiveness)}`}>
                        {log.effectiveness}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {getTriggerBadge(log.trigger)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SprayLogs;