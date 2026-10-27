import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Play } from "lucide-react";
import { format } from "date-fns";

interface SessionCardProps {
  title: string;
  date: Date;
  duration: number;
  participants: number;
  status: "upcoming" | "completed" | "draft";
  score?: number;
  onLaunch?: () => void;
}

const statusConfig = {
  upcoming: { label: "Upcoming", variant: "default" as const },
  completed: { label: "Completed", variant: "secondary" as const },
  draft: { label: "Draft", variant: "outline" as const },
};

export function SessionCard({
  title,
  date,
  duration,
  participants,
  status,
  score,
  onLaunch,
}: SessionCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
        {score !== undefined && (
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">{score}</div>
            <div className="text-xs text-muted-foreground">Overall</div>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {format(date, "MMM dd, yyyy · h:mm a")}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          {duration} minutes
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          {participants} participants
        </div>
      </div>

      {onLaunch && (
        <Button onClick={onLaunch} className="w-full">
          <Play className="h-4 w-4 mr-2" />
          Launch Rehearsal
        </Button>
      )}
    </Card>
  );
}
