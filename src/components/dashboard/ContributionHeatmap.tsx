import React from "react";
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfWeek,
  startOfMonth,
  isSameMonth
} from "date-fns";

interface HeatmapProps {
  data: Record<string, number>; // { "2025-09-01": 5, "2025-09-10": 3, ... }
}

const ContributionHeatmap: React.FC<HeatmapProps> = ({ data }) => {
  const today = new Date();
  const startDate = subDays(today, 365);
  const days = eachDayOfInterval({ start: startDate, end: today });

  // Break days into weeks
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  days.forEach((day) => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length) weeks.push(currentWeek);

  // Color scale
  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count < 3) return "bg-green-600/40";
    if (count < 6) return "bg-green-500";
    if (count < 10) return "bg-green-400";
    return "bg-green-300";
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-white font-semibold mb-3">Contribution Heatmap</h2>

      <div className="flex">
        {/* Month labels */}
        <div className="ml-8 flex space-x-6 text-xs text-gray-400">
          {weeks.map((week, i) => {
            const firstDay = week[0];
            if (firstDay.getDate() <= 7) {
              return (
                <span key={i} className="w-10">
                  {format(firstDay, "MMM")}
                </span>
              );
            }
            return <span key={i} className="w-10"></span>;
          })}
        </div>
      </div>

      <div className="flex">
        {/* Weekday labels */}
        <div className="flex flex-col justify-between mr-2 text-xs text-gray-400">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Grid */}
        <div className="flex space-x-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col space-y-1">
              {week.map((day, di) => {
                const key = format(day, "yyyy-MM-dd");
                const count = data[key] || 0;
                return (
                  <div
                    key={di}
                    title={`${key}: ${count} contributions`}
                    className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end mt-2 space-x-1 text-xs text-gray-400">
        <span>Less</span>
        <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-600/40 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
