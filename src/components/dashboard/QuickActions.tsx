import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, FileSpreadsheet, Bell, Users, Plus } from "lucide-react";
import { toast } from "sonner";

const actions = [
  {
    icon: Mail,
    label: "Send Performance Report",
    color: "text-primary",
    action: () => toast.success("Performance reports sent to all agencies")
  },
  {
    icon: FileSpreadsheet,
    label: "Export Data (Excel)",
    color: "text-success",
    action: () => toast.success("Data exported successfully")
  },
  {
    icon: Bell,
    label: "Configure Alerts",
    color: "text-warning",
    action: () => toast.info("Opening alert configuration...")
  },
  {
    icon: Users,
    label: "Schedule Meetings",
    color: "text-secondary",
    action: () => toast.info("Opening meeting scheduler...")
  },
  {
    icon: Plus,
    label: "Add Agency/Contractor",
    color: "text-accent",
    action: () => toast.info("Opening registration form...")
  }
];

const QuickActions = () => {
  return (
    <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
      <h2 className="text-lg font-bold text-foreground mb-4">⚡ Quick Actions</h2>
      
      <div className="flex flex-wrap gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Button
              key={idx}
              variant="outline"
              className="flex items-center gap-2 hover-lift"
              onClick={action.action}
            >
              <Icon className={`h-4 w-4 ${action.color}`} />
              <span className="text-sm">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
