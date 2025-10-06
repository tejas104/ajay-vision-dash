import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICards from "@/components/dashboard/KPICards";
import AgencyHeatmap from "@/components/dashboard/AgencyHeatmap";
import ContractorLeaderboard from "@/components/dashboard/ContractorLeaderboard";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <KPICards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgencyHeatmap 
            selectedAgency={selectedAgency}
            setSelectedAgency={setSelectedAgency}
          />
          <ContractorLeaderboard />
        </div>
        
        <QuickActions />
      </main>
    </div>
  );
};

export default Dashboard;
