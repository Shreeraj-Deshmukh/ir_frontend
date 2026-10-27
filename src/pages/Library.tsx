import { SessionCard } from "@/components/SessionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, PlusCircle, Clock, Users } from "lucide-react";
import { addDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const sessions = [
  {
    id: 1,
    title: "Q1 2026 Earnings Call",
    date: "Jun 24 2026",
    time: "11:43 AM",
    relativeTime: "2 hours ago",
    duration: 45,
    participants: 5,
    status: "completed" as const,
    clarity: 85,
    confidence: 78,
    engagement: 91,
    score: 87,
  },
  {
    id: 2,
    title: "Investor Day Rehearsal",
    date: "Jun 18 2026",
    time: "2:15 PM",
    relativeTime: "1 day ago",
    duration: 90,
    participants: 6,
    status: "completed" as const,
    clarity: 88,
    confidence: 92,
    engagement: 90,
    score: 92,
  },
  {
    id: 3,
    title: "Roche Peer Call Review",
    date: "Jun 11 2026",
    time: "9:30 AM",
    relativeTime: "3 days ago",
    duration: 60,
    participants: 3,
    status: "completed" as const,
    clarity: 82,
    confidence: 85,
    engagement: 88,
    score: 85,
  },
  {
    id: 4,
    title: "Pipeline Update Rehearsal",
    date: "Jun 05 2026",
    time: "3:00 PM",
    relativeTime: "5 days ago",
    duration: 60,
    participants: 4,
    status: "completed" as const,
    clarity: 86,
    confidence: 88,
    engagement: 90,
    score: 88,
  },
];

export default function Library() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Session Library</h1>
            <p className="text-muted-foreground">
              Browse past rehearsals and review performance analytics
            </p>
          </div>
          <Link to="/session/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Session
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search sessions..." className="pl-10" />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="me">My Sessions</SelectItem>
              <SelectItem value="team">Team Sessions</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="recent">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="score">Highest Score</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {sessions.length} sessions
          </p>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <Card key={session.id} className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate("/session/report/1")}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{session.title}</h3>
                <Badge variant="secondary">{session.status}</Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                {session.date} • {session.time}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {session.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {session.participants}
                  </span>
                </div>
                <span className="text-xs">{session.relativeTime}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs">Clarity {session.clarity}</Badge>
                <Badge variant="outline" className="text-xs">Confidence {session.confidence}</Badge>
                <Badge variant="outline" className="text-xs">Engagement {session.engagement}</Badge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">Overall Score</span>
                <span className="text-2xl font-bold text-green-600">{session.score}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
