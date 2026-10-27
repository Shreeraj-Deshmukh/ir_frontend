import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info, Users, FileText, UserCircle, CheckCircle, CheckCircle2, Circle, GripVertical, ArrowLeft, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { label: "Info", icon: Info },
  { label: "Participants", icon: Users },
  { label: "Content", icon: FileText },
  { label: "Personas", icon: UserCircle },
  { label: "Review & Launch", icon: CheckCircle },
];

const mockParticipants = [
  { id: 1, name: "Sloan Simpson", role: "IR Host" },
  { id: 2, name: "Vasant Narasimhan", role: "CEO" },
  { id: 3, name: "Harry Kirsch", role: "CFO" },
  { id: 4, name: "Mukul Mehta", role: "Deputy CFO" },
  { id: 5, name: "Marie-France Tschudin", role: "President Innovative Meds" },
];

const mockPersonas = [
  { id: 1, name: "Simon Baker", firm: "Redburn Atlantic", difficulty: 9, focus: ["Financials", "Pipeline"] },
  { id: 2, name: "Florent Cespedes", firm: "Bernstein", difficulty: 7, focus: ["Commercial", "Trials"] },
  { id: 3, name: "Emily Field", firm: "Barclays", difficulty: 6, focus: ["Financials", "FX"] },
  { id: 4, name: "Matthew Weston", firm: "UBS", difficulty: 8, focus: ["Pipeline", "Commercial"] },
];

export default function SessionCreation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionName, setSessionName] = useState("Q2 2026 Earnings Call Rehearsal");
  const [mode, setMode] = useState("team");
  const [objective, setObjective] = useState("full");
  const [duration, setDuration] = useState("45");
  const [template, setTemplate] = useState("earnings");
  const [privacy, setPrivacy] = useState("ir-execs");
  const [selectedParticipants, setSelectedParticipants] = useState([1, 2, 3]);
  const [preparedRemarks, setPreparedRemarks] = useState(
    "Good morning and thank you for joining Novartis' Q2 2026 earnings call. I'm Sloan Simpson, Head of Investor Relations. Today we'll review our quarterly performance, strategic initiatives, and answer your questions on our pipeline and commercial execution"
  );
  const [selectedSources, setSelectedSources] = useState([true, false, false, true]);
  const [disclosureGuardrails, setDisclosureGuardrails] = useState([true, true]);
  const [selectedPersonas, setSelectedPersonas] = useState([1, 2, 3, 4]);
  const [intensity, setIntensity] = useState([1]);
  const [followUpDepth, setFollowUpDepth] = useState("2");
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleLaunch = () => {
    navigate("/session/workspace/1");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Investor Call Rehearsal</h1>
          <p className="text-muted-foreground">
            Set up prepared remarks, Q&A personas, and participants
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      idx <= currentStep ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-background text-muted-foreground"
                    }`}>
                      {idx < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={`text-sm mt-2 ${idx <= currentStep ? "font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${idx < currentStep ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-6 mb-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="sessionName">Session Name</Label>
                <Input id="sessionName" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
              </div>

              <div>
                <Label>Mode</Label>
                <RadioGroup value={mode} onValueChange={setMode} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Objective</Label>
                <RadioGroup value={objective} onValueChange={setObjective} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prepared" id="prepared" />
                    <Label htmlFor="prepared">Prepared remarks</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="qa" id="qa" />
                    <Label htmlFor="qa">Q&A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full">Full</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="45">45</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Call Template</Label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earnings">Novartis Earnings Call Template</SelectItem>
                    <SelectItem value="pipeline">Pipeline</SelectItem>
                    <SelectItem value="product">Product Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Privacy</Label>
                <Select value={privacy} onValueChange={setPrivacy}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ir-execs">IR + Execs</SelectItem>
                    <SelectItem value="me">Only me</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm text-muted-foreground">
                  This mirrors the usual IR flow: intro → strategy → financials → Q&A
                </p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base">Participants</Label>
                <p className="text-sm text-muted-foreground mb-4">Select and order participants. At least 1 Host and 1 Speaker required</p>
              </div>

              <div className="space-y-3">
                {mockParticipants.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 border rounded-md">
                    <Checkbox
                      checked={selectedParticipants.includes(p.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedParticipants([...selectedParticipants, p.id]);
                        } else {
                          setSelectedParticipants(selectedParticipants.filter((id) => id !== p.id));
                        }
                      }}
                    />
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                    <Select defaultValue={p.role.toLowerCase().includes("host") ? "host" : "speaker"}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="host">Host</SelectItem>
                        <SelectItem value="speaker">Speaker</SelectItem>
                        <SelectItem value="observer">Observer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="remarks">Prepared Remarks</Label>
                <Textarea
                  id="remarks"
                  value={preparedRemarks}
                  onChange={(e) => setPreparedRemarks(e.target.value)}
                  className="mt-2 min-h-[150px]"
                />
              </div>

              <div>
                <Label className="text-base">Reference Sources</Label>
                <p className="text-sm text-muted-foreground mb-3">Select relevant previous calls and materials</p>
                <div className="space-y-2">
                  {["Q1 2026 Novartis call", "Roche Q1 2026", "AstraZeneca Q1 2026", "Product summary"].map((source, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedSources[idx]}
                        onCheckedChange={(checked) => {
                          const newSources = [...selectedSources];
                          newSources[idx] = checked === true;
                          setSelectedSources(newSources);
                        }}
                      />
                      <Label>{source}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base">Disclosure Guardrails</Label>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label>Restrict to disclosed guidance</Label>
                    <Checkbox
                      checked={disclosureGuardrails[0]}
                      onCheckedChange={(checked) => {
                        const newGuardrails = [...disclosureGuardrails];
                        newGuardrails[0] = checked === true;
                        setDisclosureGuardrails(newGuardrails);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label>Flag market-moving statements</Label>
                    <Checkbox
                      checked={disclosureGuardrails[1]}
                      onCheckedChange={(checked) => {
                        const newGuardrails = [...disclosureGuardrails];
                        newGuardrails[1] = checked === true;
                        setDisclosureGuardrails(newGuardrails);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base">Select Analyst Personas (max 4)</Label>
                <p className="text-sm text-muted-foreground mb-4">Choose AI analysts to simulate questions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPersonas.map((persona) => (
                  <Card
                    key={persona.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedPersonas.includes(persona.id) ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => {
                      if (selectedPersonas.includes(persona.id)) {
                        setSelectedPersonas(selectedPersonas.filter((id) => id !== persona.id));
                      } else if (selectedPersonas.length < 4) {
                        setSelectedPersonas([...selectedPersonas, persona.id]);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{persona.name}</h4>
                        <p className="text-sm text-muted-foreground">{persona.firm}</p>
                      </div>
                      <Badge variant="outline">
                        {persona.difficulty}/10
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {persona.focus.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div>
                <Label>Intensity</Label>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    min={0}
                    max={2}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">Aggressive</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {intensity[0] === 0 ? "Low" : intensity[0] === 1 ? "Realistic" : "Aggressive"}
                </p>
              </div>

              <div>
                <Label>Follow-up Depth</Label>
                <Select value={followUpDepth} onValueChange={setFollowUpDepth}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 question</SelectItem>
                    <SelectItem value="2">2 questions</SelectItem>
                    <SelectItem value="3">3 questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">Session Summary</Label>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-3 border rounded-md">
                  <span className="text-sm font-medium">Title</span>
                  <span className="col-span-2 text-sm text-muted-foreground">{sessionName}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border rounded-md">
                  <span className="text-sm font-medium">Mode</span>
                  <span className="col-span-2 text-sm text-muted-foreground capitalize">{mode}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border rounded-md">
                  <span className="text-sm font-medium">Participants</span>
                  <span className="col-span-2 text-sm text-muted-foreground">
                    {selectedParticipants.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border rounded-md">
                  <span className="text-sm font-medium">Content</span>
                  <span className="col-span-2 text-sm text-muted-foreground">
                    Prepared remarks, {selectedSources.filter(Boolean).length} sources
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border rounded-md">
                  <span className="text-sm font-medium">Personas</span>
                  <span className="col-span-2 text-sm text-muted-foreground">
                    {selectedPersonas.length} analysts
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border rounded-md">
                  <span className="text-sm font-medium">Duration</span>
                  <span className="col-span-2 text-sm text-muted-foreground">{duration} minutes</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          <div className="flex gap-3">
            {currentStep === steps.length - 1 ? (
              <>
                <Button variant="outline" onClick={() => navigate("/session/workspace/1")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Save & Return
                </Button>
                <Button onClick={handleLaunch}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Launch Now
                </Button>
              </>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}