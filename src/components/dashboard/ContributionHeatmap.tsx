import React from "react";
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfWeek,
  getDay,
} from "date-fns";

interface HeatmapProps {
  data: Record<string, number>;
}

const ContributionHeatmap: React.FC<HeatmapProps> = ({ data }) => {
  const today = new Date();
  const startDate = subDays(today, 180); // last 6 months
  
  // Get all days in the interval
  const days = eachDayOfInterval({ start: startDate, end: today });

  // Group days into weeks starting from Monday
  const weeks: Date[][] = [];
  let currentWeek: Date[] = Array(7).fill(null); // Initialize with null for empty days

  days.forEach((day) => {
    const dayOfWeek = getDay(day); // 0=Sun, 1=Mon, ..., 6=Sat
    
    // Convert to Monday-first (0=Mon, 1=Tue, ..., 6=Sun)
    const mondayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    currentWeek[mondayIndex] = day;
    
    // If we've filled Sunday or it's the last day, push the week
    if (mondayIndex === 6 || day.getTime() === today.getTime()) {
      weeks.push([...currentWeek]);
      currentWeek = Array(7).fill(null);
    }
  });

  // Color scale
  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count < 3) return "bg-green-600/40";
    if (count < 6) return "bg-green-500";
    if (count < 10) return "bg-green-400";
    return "bg-green-300";
  };

  // Get unique month labels (only show once per month)
  const getMonthLabels = () => {
    const labels: { index: number; month: string }[] = [];
    let lastMonth = "";
    
    weeks.forEach((week, weekIndex) => {
      // Find first non-null day in the week
      const firstValidDay = week.find(day => day !== null);
      if (firstValidDay) {
        const currentMonth = format(firstValidDay, "MMM");
        if (currentMonth !== lastMonth) {
          labels.push({ index: weekIndex, month: currentMonth });
          lastMonth = currentMonth;
        }
      }
    });
    
    return labels;
  };

  const monthLabels = getMonthLabels();

  // Get motivational message based on count
  const getMessage = (count: number) => {
    if (count === 0) return "No contributions";
    if (count === 1) return "1 contribution - Good start!";
    if (count < 5) return `${count} contributions - Nice work!`;
    if (count < 10) return `${count} contributions - Great job!`;
    return `${count} contributions - Excellent work!`;
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg w-4/5 mx-auto my-8">
      <h2 className="text-white font-semibold mb-4 text-lg text-center">
        Contribution Heatmap
      </h2>

      {/* Month Labels */}
      <div className="flex ml-12 mb-2">
        {monthLabels.map((label, index) => (
          <div
            key={index}
            className="text-sm text-gray-400 font-medium"
            style={{ 
              marginLeft: index === 0 ? '0' : `${(label.index - monthLabels[index - 1]?.index || 0) * 28 - 16}px`
            }}
          >
            {label.month}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Weekday Labels */}
        <div className="flex flex-col justify-between mr-3 text-xs text-gray-400 h-48">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <span 
              key={day} 
              className="h-6 flex items-center justify-end pr-2 w-12"
              style={{ marginBottom: index < 6 ? '2px' : '0' }}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex space-x-1 flex-1 overflow-hidden">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return (
                    <div
                      key={dayIndex}
                      className="w-6 h-6 rounded-sm bg-transparent border border-transparent"
                    />
                  );
                }

                const key = format(day, "yyyy-MM-dd");
                const count = data[key] || 0;
                
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    title={`${format(day, "MMM dd, yyyy")}: ${getMessage(count)}`}
                    className={`
                      w-6 h-6 rounded-sm border border-white/10 
                      ${getColor(count)} 
                      hover:scale-110 hover:shadow-lg hover:border-white/30 
                      transition-all duration-200 cursor-pointer
                      ${count > 0 ? 'shadow-md' : ''}
                    `}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-400">
        <span className="text-xs">Less</span>
        <div className="w-4 h-4 bg-gray-800 rounded-sm border border-white/10"></div>
        <div className="w-4 h-4 bg-green-600/40 rounded-sm border border-white/10"></div>
        <div className="w-4 h-4 bg-green-500 rounded-sm border border-white/10"></div>
        <div className="w-4 h-4 bg-green-400 rounded-sm border border-white/10"></div>
        <div className="w-4 h-4 bg-green-300 rounded-sm border border-white/10"></div>
        <span className="text-xs">More</span>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-4 text-xs text-gray-500">
        Showing contributions from last 6 months
      </div>
    </div>
  );
};

export default ContributionHeatmap;