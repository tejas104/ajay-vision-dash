import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICards from "@/components/dashboard/KPICards";
import AgencyHeatmap from "@/components/dashboard/AgencyHeatmap";
import ContractorLeaderboard from "@/components/dashboard/ContractorLeaderboard";
import QuickActions from "@/components/dashboard/QuickActions";
import ContributionHeatmap from "@/components/dashboard/ContributionHeatmap";

const Dashboard = () => {
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);

  // Example data for ContributionHeatmap
  const contributionData: Record<string, number> = {
    "2025-10-01": 5,
    "2025-10-02": 3,
    "2025-10-03": 0,
    "2025-10-04": 7,
    "2025-10-05": 2,
    // add more dates as needed
  };

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

        <ContributionHeatmap data={contributionData} />

        <QuickActions />
      </main>
    </div>
  );
};

export default Dashboard;
