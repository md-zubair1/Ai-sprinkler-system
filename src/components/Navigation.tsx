import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Settings, 
  History, 
  Droplets,
  Bell
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'stands',
      label: 'Stand Control', 
      icon: Settings
    },
    {
      id: 'logs',
      label: 'Spray Logs',
      icon: History
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: Bell
    }
  ];

  return (
    <nav className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              activeTab === item.id && "bg-primary text-primary-foreground shadow-sm"
            )}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default Navigation;