import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AgencyData {
  name: string;
  fundUtilization: number;
  completionRate: number;
  timelineAdherence: number;
  qualityScore: number;
  rating: string;
  projects: string[];
  contact: string;
}

const agencyData: AgencyData[] = [
  {
    name: "Agency A - Bihar Infrastructure Ltd.",
    fundUtilization: 92,
    completionRate: 88,
    timelineAdherence: 95,
    qualityScore: 85,
    rating: "⭐ Excellent",
    projects: ["School Construction Block-A", "Hostel Building Phase-1", "Community Center Patna"],
    contact: "Amit Kumar - 9876543210"
  },
  {
    name: "Agency B - Patna Development Corp.",
    fundUtilization: 75,
    completionRate: 82,
    timelineAdherence: 68,
    qualityScore: 78,
    rating: "✓ Good",
    projects: ["Road Infrastructure NH-83", "Water Supply System"],
    contact: "Priya Singh - 9876543211"
  },
  {
    name: "Agency C - Eastern Builders",
    fundUtilization: 45,
    completionRate: 38,
    timelineAdherence: 52,
    qualityScore: 41,
    rating: "⚠ Average",
    projects: ["Bridge Construction Phase-2", "Drainage System Upgrade"],
    contact: "Rahul Sharma - 9876543212"
  },
  {
    name: "Agency D - Ganga Projects Ltd.",
    fundUtilization: 28,
    completionRate: 35,
    timelineAdherence: 42,
    qualityScore: 31,
    rating: "🔴 Underperforming",
    projects: ["Adarsh Gram Infrastructure"],
    contact: "Vijay Patel - 9876543213"
  },
  {
    name: "Agency E - Magadh Construction",
    fundUtilization: 88,
    completionRate: 90,
    timelineAdherence: 85,
    qualityScore: 89,
    rating: "⭐ Excellent",
    projects: ["Government Hospital Extension", "School Renovation Project"],
    contact: "Sunita Devi - 9876543214"
  },
  {
    name: "Agency F - Nalanda Developers",
    fundUtilization: 62,
    completionRate: 58,
    timelineAdherence: 65,
    qualityScore: 60,
    rating: "⚠ Average",
    projects: ["Rural Road Development", "Anganwadi Construction"],
    contact: "Ravi Kumar - 9876543215"
  },
  {
    name: "Agency G - Vaishali Infrastructure",
    fundUtilization: 78,
    completionRate: 80,
    timelineAdherence: 72,
    qualityScore: 75,
    rating: "✓ Good",
    projects: ["Panchayat Bhawan Construction", "Solar Project Installation"],
    contact: "Neha Verma - 9876543216"
  },
  {
    name: "Agency H - Saran Builders",
    fundUtilization: 35,
    completionRate: 40,
    timelineAdherence: 38,
    qualityScore: 42,
    rating: "⚠ Average",
    projects: ["Community Hall Project"],
    contact: "Manoj Yadav - 9876543217"
  },
  {
    name: "Agency I - Muzaffarpur Constructions",
    fundUtilization: 85,
    completionRate: 87,
    timelineAdherence: 82,
    qualityScore: 84,
    rating: "⭐ Excellent",
    projects: ["Primary Health Center", "Rural Electrification Phase-3"],
    contact: "Anil Kumar - 9876543218"
  },
  {
    name: "Agency J - Darbhanga Projects",
    fundUtilization: 55,
    completionRate: 60,
    timelineAdherence: 58,
    qualityScore: 52,
    rating: "⚠ Average",
    projects: ["Skill Development Center", "Women Empowerment Center"],
    contact: "Geeta Singh - 9876543219"
  },
  {
    name: "Agency K - Bhagalpur Infrastructure",
    fundUtilization: 70,
    completionRate: 75,
    timelineAdherence: 68,
    qualityScore: 72,
    rating: "✓ Good",
    projects: ["Bus Stand Renovation", "Public Toilet Construction"],
    contact: "Suresh Prasad - 9876543220"
  },
  {
    name: "Agency L - Begusarai Developers",
    fundUtilization: 25,
    completionRate: 30,
    timelineAdherence: 35,
    qualityScore: 28,
    rating: "🔴 Underperforming",
    projects: ["Stadium Construction Project"],
    contact: "Rajesh Kumar - 9876543221"
  }
];

const getScoreColor = (score: number): string => {
  if (score >= 80) return "bg-success";
  if (score >= 60) return "bg-success-light";
  if (score >= 40) return "bg-warning";
  if (score >= 20) return "bg-accent";
  return "bg-destructive";
};

const getScoreTextColor = (score: number): string => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-success-light";
  if (score >= 40) return "text-warning";
  if (score >= 20) return "text-accent";
  return "text-destructive";
};

interface AgencyHeatmapProps {
  selectedAgency: string | null;
  setSelectedAgency: (agency: string | null) => void;
}

const AgencyHeatmap = ({ selectedAgency, setSelectedAgency }: AgencyHeatmapProps) => {
  const metrics = ["Fund Utilization %", "Completion Rate", "Timeline Adherence", "Quality Score"];
  
  const selected = agencyData.find(a => a.name === selectedAgency);

  return (
    <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          📊 Agency Performance Matrix
        </h2>
        <p className="text-sm text-muted-foreground">Real-time performance tracking across all agencies</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <div className="text-xs font-medium text-muted-foreground">Agency</div>
            {metrics.map((metric, i) => (
              <div key={i} className="text-xs font-medium text-muted-foreground text-center">
                {metric}
              </div>
            ))}
          </div>

          {/* Heatmap Rows */}
          <div className="space-y-2">
            {agencyData.map((agency, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 gap-2 group cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-all"
                onClick={() => setSelectedAgency(agency.name)}
              >
                <div className="text-sm font-medium text-foreground truncate flex items-center gap-2">
                  <span className="truncate">{agency.name.split(" - ")[1] || agency.name}</span>
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    {agency.rating}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className={`${getScoreColor(agency.fundUtilization)} px-3 py-1 rounded text-xs font-medium text-white hover:scale-110 transition-transform`}>
                    {agency.fundUtilization}%
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className={`${getScoreColor(agency.completionRate)} px-3 py-1 rounded text-xs font-medium text-white hover:scale-110 transition-transform`}>
                    {agency.completionRate}%
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className={`${getScoreColor(agency.timelineAdherence)} px-3 py-1 rounded text-xs font-medium text-white hover:scale-110 transition-transform`}>
                    {agency.timelineAdherence}%
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className={`${getScoreColor(agency.qualityScore)} px-3 py-1 rounded text-xs font-medium text-white hover:scale-110 transition-transform`}>
                    {agency.qualityScore}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Agency Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">📞 {selected.contact}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedAgency(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Fund Utilization</p>
                <p className={`text-2xl font-bold ${getScoreTextColor(selected.fundUtilization)}`}>
                  {selected.fundUtilization}%
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className={`text-2xl font-bold ${getScoreTextColor(selected.completionRate)}`}>
                  {selected.completionRate}%
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Timeline Adherence</p>
                <p className={`text-2xl font-bold ${getScoreTextColor(selected.timelineAdherence)}`}>
                  {selected.timelineAdherence}%
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className={`text-2xl font-bold ${getScoreTextColor(selected.qualityScore)}`}>
                  {selected.qualityScore}%
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Current Projects</h4>
              <div className="space-y-2">
                {selected.projects.map((project, i) => (
                  <Badge key={i} variant="secondary" className="mr-2">
                    {project}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="default" className="flex-1">View Details</Button>
              <Button variant="outline" className="flex-1">Send Alert</Button>
              <Button variant="outline" className="flex-1">Schedule Meeting</Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default AgencyHeatmap;
