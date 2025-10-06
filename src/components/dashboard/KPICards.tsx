import { Folder, Building, TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const kpiData = [
  {
    title: "Active Projects",
    value: "24",
    icon: Folder,
    trend: "+3 from last month",
    trendUp: true,
    color: "text-primary"
  },
  {
    title: "Total Agencies",
    value: "12",
    icon: Building,
    trend: "9 active, 3 underperforming",
    trendUp: false,
    color: "text-secondary"
  },
  {
    title: "Fund Utilization",
    value: "78.5%",
    icon: TrendingUp,
    trend: "↑5% increase",
    trendUp: true,
    color: "text-success"
  },
  {
    title: "Avg Completion Time",
    value: "45 days",
    icon: Clock,
    trend: "8 days over target",
    trendUp: false,
    color: "text-accent"
  }
];

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card 
            key={index}
            className="glass-card p-6 hover-lift animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-foreground mb-2">{kpi.value}</h3>
                <p className={`text-xs flex items-center gap-1 ${kpi.trendUp ? 'text-success' : 'text-warning'}`}>
                  {kpi.trend}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${kpi.color}/20 to-${kpi.color}/10 flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default KPICards;
