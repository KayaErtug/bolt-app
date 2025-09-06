// Dosya: src/components/dashboard/AchievementsCard.tsx

import React from "react";
import { Card, CardContent } from "../ui/card";

export type Achievement = {
  id: number | string;
  title: string;
  description?: string;
  achieved?: boolean;
  points?: number;
  unlocked?: boolean;
  icon?: string;
  progress?: number;
};

export interface AchievementsCardProps {
  achievements: Achievement[];
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ achievements }) => {
  return (
    <Card>
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Achievements</h3>
      </div>
      <CardContent>
        <ul className="space-y-2">
          {achievements?.map((a) => (
            <li key={a.id} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{a.title}</span>
                {a.description && (
                  <span className="text-sm text-gray-400">{a.description}</span>
                )}
                {a.points !== undefined && (
                  <span className="text-xs text-gray-500">Points: {a.points}</span>
                )}
                {a.progress !== undefined && (
                  <span className="text-xs text-gray-500">Progress: {Math.round(a.progress * 100)}%</span>
                )}
              </div>
              <span>{a.unlocked ? "✅" : "❌"}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export { AchievementsCard };
export default AchievementsCard;
