import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Lightbulb, Target, MessageSquare, TrendingUp, ArrowLeftCircle, BookOpen } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const highlights = [
  "Strong opening and strategic framing",
  "Clear financial guidance delivery",
  "Effective handling of pipeline questions",
];

const moments = [
  {
    id: 1,
    time: "12:35",
    type: "peak",
    score: 94,
    snippet: "Our core operating income grew 8% in constant currency, reflecting strong execution...",
  },
  {
    id: 2,
    time: "18:42",
    type: "dip",
    score: 72,
    snippet: "Well, um, regarding the competitive landscape, we're, uh, monitoring that closely...",
  },
  {
    id: 3,
    time: "25:18",
    type: "peak",
    score: 92,
    snippet: "As disclosed in our Q3 call, we expect full-year growth of 4-6% in constant currency.",
  },
];

const coachNotes = [
  "Reduce filler words by 15% - particularly 'um' and 'you know'",
  "Maintain opening energy throughout Q&A section",
  "Excellent anchoring to disclosed guidance in financial questions",
];

const personaHeatmap = [
  { name: "Simon Baker", questions: 4, difficulty: 9, avgScore: 84 },
  { name: "Florent Cespedes", questions: 3, difficulty: 7, avgScore: 89 },
  { name: "Emily Field", questions: 2, difficulty: 6, avgScore: 91 },
  { name: "Matthew Weston", questions: 3, difficulty: 8, avgScore: 86 },
];

export default function SessionReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Q2 2026 Earnings Call Rehearsal</h1>
              <p className="text-muted-foreground">Completed • 45 minutes • 3 participants</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Overall Score */}
          <Card className="p-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-accent mb-2">87</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">85</div>
                    <div className="text-sm text-muted-foreground">Clarity</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">78</div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">91</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Highlights */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Highlights
              </h2>
              <ul className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Moments */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Moments</h2>
              <div className="space-y-4">
                {moments.map((moment) => (
                  <div key={moment.id} className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={moment.type === "peak" ? "default" : "outline"}>
                          {moment.time}
                        </Badge>
                        <Badge variant={moment.type === "peak" ? "default" : "secondary"}>
                          {moment.type === "peak" ? "Peak" : "Dip"}
                        </Badge>
                      </div>
                      <span className="text-2xl font-bold text-accent">{moment.score}</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">&ldquo;{moment.snippet}&rdquo;</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Coach Notes */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Coach Notes</h2>
              <div className="space-y-3">
                {coachNotes.map((note, idx) => (
                  <div key={idx} className="p-4 bg-muted rounded-md">
                    <p className="text-sm">{note}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Persona Heatmap */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Persona Heatmap</h2>
              <div className="space-y-4">
                {personaHeatmap.map((persona) => (
                  <div key={persona.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{persona.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {persona.questions} questions • Difficulty {persona.difficulty}/10
                        </p>
                      </div>
                      <span className="text-lg font-bold text-accent">{persona.avgScore}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${persona.avgScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Q&A Coverage */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Q&A Coverage</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Financials</span>
                  <Badge variant="secondary">5 questions</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Pipeline</span>
                  <Badge variant="secondary">4 questions</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Commercial</span>
                  <Badge variant="secondary">2 questions</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Trials</span>
                  <Badge variant="secondary">1 question</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <Button onClick={() => navigate("/")}>
            <ArrowLeftCircle className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate("/library")}>
            <BookOpen className="h-4 w-4 mr-2" />
            View Library
          </Button>
        </div>
      </div>
    </div>
  );
}
