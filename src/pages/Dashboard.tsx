import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, TrendingUp, Clock, Users, Target, Calendar, ShieldCheck, Sparkles, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const upcomingSessions = [
  {
    id: 1,
    title: "Pipeline / R&D Day",
    date: "Jul 08 2026",
    duration: 90,
    participants: 6,
    status: "Draft",
  },
  {
    id: 2,
    title: "Q2 2026 Earnings Call Rehearsal",
    date: "Jul 14 2026",
    duration: 60,
    participants: 5,
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Roche Peer Call Review",
    date: "Jul 17 2026",
    duration: 45,
    participants: 3,
    status: "IR Team",
  },
];

const recentSessions = [
  {
    id: 2,
    title: "Q1 2026 Earnings Call",
    date: "Jun 24 2026",
    time: "11:43 AM",
    duration: 45,
    participants: 5,
    clarity: 85,
    confidence: 78,
    engagement: 91,
    score: 87,
  },
  {
    id: 3,
    title: "Investor Day Rehearsal",
    date: "Jun 18 2026",
    time: "2:15 PM",
    duration: 90,
    participants: 6,
    clarity: 88,
    confidence: 92,
    engagement: 90,
    score: 92,
  },
];

const activities = [
  {
    id: 1,
    user: "Vasant Narasimhan",
    action: "completed rehearsal",
    session: "Q1 2026 Earnings Call",
    score: 87,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Sloan Simpson",
    action: "created draft",
    session: "Pipeline/R&D Day",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: "Harry Kirsch",
    action: "shared feedback on",
    session: "Investor Day Rehearsal",
    time: "1 day ago",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Vasant</h1>
              <p className="text-muted-foreground">
                Your next rehearsal is in 5 days
              </p>
            </div>
            <Button onClick={() => navigate("/session/workspace/1")}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Launch Rehearsal
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">85</div>
                <div className="text-sm text-muted-foreground">Clarity Index</div>
                <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">78</div>
                <div className="text-sm text-muted-foreground">Confidence Score</div>
                <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">91</div>
                <div className="text-sm text-muted-foreground">Engagement Index</div>
                <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/session/workspace/1")}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{session.title}</h3>
                          <Badge variant="secondary">{session.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {session.duration} min
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {session.participants} participants
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Performance
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentSessions.map((session) => (
                  <Card key={session.id} className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/session/report/1")}>
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2">{session.title}</h3>
                      <div className="text-sm text-muted-foreground mb-3">
                        {session.date} • {session.time}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {session.duration} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {session.participants}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">Clarity {session.clarity}</Badge>
                        <Badge variant="outline" className="text-xs">Confidence {session.confidence}</Badge>
                        <Badge variant="outline" className="text-xs">Engagement {session.engagement}</Badge>
                      </div>
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

          {/* Right Column - Activity Feed */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
            <Card className="p-4">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.session}</span>
                    </p>
                    {activity.score && (
                      <div className="mt-1">
                        <span className="text-xs font-medium text-accent">
                          Score: {activity.score}/100
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
