import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface ContractorData {
  rank: number;
  medal: string;
  name: string;
  score: number;
  completed: string;
  avgDelay: string;
  budgetVariance: string;
  rating: number;
  status: "excellent" | "good" | "average" | "poor";
  aiAlert?: string;
}

const contractors: ContractorData[] = [
  {
    rank: 1,
    medal: "🥇",
    name: "Sharma Construction Co.",
    score: 94,
    completed: "8/8",
    avgDelay: "-2 days",
    budgetVariance: "+2%",
    rating: 4.8,
    status: "excellent"
  },
  {
    rank: 2,
    medal: "🥈",
    name: "Kumar Builders Ltd.",
    score: 89,
    completed: "6/7",
    avgDelay: "+5 days",
    budgetVariance: "-1%",
    rating: 4.5,
    status: "excellent"
  },
  {
    rank: 3,
    medal: "🥉",
    name: "Singh Infrastructure",
    score: 85,
    completed: "5/6",
    avgDelay: "+8 days",
    budgetVariance: "+5%",
    rating: 4.2,
    status: "good"
  },
  {
    rank: 4,
    medal: "4️⃣",
    name: "Verma Enterprises",
    score: 78,
    completed: "7/9",
    avgDelay: "+12 days",
    budgetVariance: "+8%",
    rating: 3.9,
    status: "good"
  },
  {
    rank: 5,
    medal: "5️⃣",
    name: "Yadav Construction",
    score: 72,
    completed: "4/6",
    avgDelay: "+15 days",
    budgetVariance: "+10%",
    rating: 3.7,
    status: "average"
  },
  {
    rank: 6,
    medal: "6️⃣",
    name: "Mishra Builders",
    score: 68,
    completed: "3/5",
    avgDelay: "+18 days",
    budgetVariance: "+12%",
    rating: 3.4,
    status: "average"
  },
  {
    rank: 7,
    medal: "7️⃣",
    name: "Gupta Infrastructure",
    score: 61,
    completed: "4/7",
    avgDelay: "+25 days",
    budgetVariance: "+15%",
    rating: 3.1,
    status: "average"
  },
  {
    rank: 8,
    medal: "⚠",
    name: "Patel Enterprises",
    score: 52,
    completed: "2/5",
    avgDelay: "+35 days",
    budgetVariance: "+18%",
    rating: 2.8,
    status: "poor",
    aiAlert: "High risk - Consider replacement"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-success";
    case "good":
      return "bg-success-light";
    case "average":
      return "bg-warning";
    case "poor":
      return "bg-destructive";
    default:
      return "bg-muted";
  }
};

const ContractorLeaderboard = () => {
  return (
    <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          🏆 Contractor Performance Leaderboard
        </h2>
        <p className="text-sm text-muted-foreground">Based on delivery time, quality, and budget adherence</p>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {contractors.map((contractor, idx) => (
          <Card
            key={idx}
            className="p-4 hover-lift border-l-4"
            style={{
              borderLeftColor: `hsl(var(--${contractor.status === "excellent" ? "success" : contractor.status === "good" ? "success-light" : contractor.status === "average" ? "warning" : "destructive"}))`
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{contractor.medal}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{contractor.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`${getStatusColor(contractor.status)} text-white`}>
                      {contractor.score}/100
                    </Badge>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(contractor.rating) ? "fill-warning text-warning" : "text-muted"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{contractor.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
              <Progress value={contractor.score} className="w-20 h-2" />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs mb-3">
              <div>
                <p className="text-muted-foreground">Projects</p>
                <p className="font-medium text-foreground">{contractor.completed} ✓</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Delay</p>
                <p className={`font-medium ${contractor.avgDelay.includes("-") ? "text-success" : contractor.avgDelay.includes("+3") ? "text-destructive" : "text-warning"}`}>
                  {contractor.avgDelay}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Budget Variance</p>
                <p className={`font-medium ${parseInt(contractor.budgetVariance) > 15 ? "text-destructive" : parseInt(contractor.budgetVariance) > 10 ? "text-warning" : "text-success"}`}>
                  {contractor.budgetVariance}
                </p>
              </div>
            </div>

            {contractor.aiAlert && (
              <div className="mb-3 p-2 bg-destructive/10 border border-destructive/20 rounded">
                <p className="text-xs text-destructive flex items-center gap-1">
                  🤖 AI Alert: {contractor.aiAlert}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {contractor.status === "poor" ? (
                <>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    View Issues
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Escalate
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1 text-xs">
                    Warning
                  </Button>
                </>
              ) : contractor.status === "average" ? (
                <>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Send Reminder
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="default" className="flex-1 text-xs">
                    View Profile
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1 text-xs">
                    Assign Project
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ContractorLeaderboard;
