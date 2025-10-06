import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-white">
              PM
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PM-AJAY</h1>
              <p className="text-xs text-muted-foreground">District Officer Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-4 py-2">
            📍 Patna District, Bihar
          </Badge>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Rajesh Kumar</p>
              <p className="text-xs text-muted-foreground">District Officer</p>
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-2">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-success rounded-full animate-pulse-slow"></span>
          Last synced: 5 mins ago
        </p>
      </div>
    </header>
  );
};

export default DashboardHeader;
