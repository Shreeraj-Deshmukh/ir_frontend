import { useState } from "react";
import { PersonaCard } from "@/components/PersonaCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, UserPlus, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const personas = [
  {
    id: 1,
    name: "Simon Baker",
    firm: "Redburn Atlantic",
    style: ["Aggressive", "Numbers-focused", "Challenging"],
    difficulty: 9,
    description: "Known for pressing management on market-share trends, pricing discipline, and pipeline differentiation. Pushes for brand and competitor specifics. Focus: Market-share dynamics • Competitive differentiation • Follow-up depth 3",
  },
  {
    id: 2,
    name: "Florent Cespedes",
    firm: "Bernstein",
    style: ["Analytical", "Detail-oriented", "Patient"],
    difficulty: 7,
    description: "Probes deeply into research efficiency and trial readouts, linking science output to investor expectations. Focus: R&D productivity • Pipeline progression • Clinical trial outcomes",
  },
  {
    id: 3,
    name: "Emily Field",
    firm: "Barclays",
    style: ["Strategic", "Big-picture", "Constructive"],
    difficulty: 6,
    description: "Focuses on high-level strategy and growth narratives. Asks about pipeline visibility and leadership priorities. Focus: Strategic growth • Pipeline visibility • Long-term guidance",
  },
  {
    id: 4,
    name: "Matthew Weston",
    firm: "UBS",
    style: ["Technical", "Skeptical", "Direct"],
    difficulty: 8,
    description: "Challenges financial assumptions, probing cost control, margins, and external headwinds like FX and inflation. Focus: Financial sensitivity • Operational efficiency • Margins and FX",
  },
];

const focusAreas = ["Financials", "Pipeline", "Commercial", "R&D", "FX"];
const styleTags = ["Aggressive", "Strategic", "Analytical", "Constructive", "Technical", "Skeptical"];

export default function Personas() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPersona, setNewPersona] = useState({
    name: "",
    firm: "",
    difficulty: "5",
    focusAreas: [] as string[],
    styleTags: [] as string[],
    bio: "",
    files: [] as string[],
  });

  const handleSavePersona = () => {
    toast({
      title: "New persona added successfully",
      description: `${newPersona.name} from ${newPersona.firm}`,
    });
    setIsDialogOpen(false);
    setNewPersona({
      name: "",
      firm: "",
      difficulty: "5",
      focusAreas: [],
      styleTags: [],
      bio: "",
      files: [],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewPersona({
      ...newPersona,
      files: [...newPersona.files, ...files.map(f => f.name)],
    });
  };

  const toggleFocusArea = (area: string) => {
    setNewPersona((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const toggleStyleTag = (tag: string) => {
    setNewPersona((prev) => ({
      ...prev,
      styleTags: prev.styleTags.includes(tag)
        ? prev.styleTags.filter((t) => t !== tag)
        : [...prev.styleTags, tag],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analyst Personas</h1>
            <p className="text-muted-foreground">
              AI-powered analyst simulations trained on 5+ years of Novartis and peer earnings call transcripts
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                New Persona
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Persona</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Analyst Name</Label>
                    <Input
                      id="name"
                      value={newPersona.name}
                      onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                      placeholder="Enter analyst name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="firm">Firm</Label>
                    <Input
                      id="firm"
                      value={newPersona.firm}
                      onChange={(e) => setNewPersona({ ...newPersona, firm: e.target.value })}
                      placeholder="Enter firm name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty (1–10)</Label>
                    <Select value={newPersona.difficulty} onValueChange={(val) => setNewPersona({ ...newPersona, difficulty: val })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Focus Areas</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {focusAreas.map((area) => (
                        <Badge
                          key={area}
                          variant={newPersona.focusAreas.includes(area) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFocusArea(area)}
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Style Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {styleTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={newPersona.styleTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleStyleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={newPersona.bio}
                    onChange={(e) => setNewPersona({ ...newPersona, bio: e.target.value })}
                    placeholder="Enter persona description and focus areas"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Upload reference files</Label>
                  <p className="text-sm text-muted-foreground mb-2">Add transcripts or sample Q&A for this analyst</p>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Choose files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    {newPersona.files.length > 0 && (
                      <div className="space-y-1">
                        {newPersona.files.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm bg-muted px-3 py-2 rounded">
                            <span className="truncate">{file}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setNewPersona({
                                ...newPersona,
                                files: newPersona.files.filter((_, i) => i !== idx)
                              })}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePersona}>Save Persona</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search personas" className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">All Personas</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">High Difficulty (8+)</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Pipeline Focus</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Financial Focus</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Strategic Focus</Badge>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              {...persona}
              onAdd={() => navigate("/session/workspace/1")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}