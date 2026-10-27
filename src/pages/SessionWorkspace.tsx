import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Edit3, CheckCircle2, Mic, Pause, Square, RotateCcw,
  FileText, Target, ShieldCheck, MessageSquare, Users, Brain,
  ClipboardList, Lightbulb, Shield, Save, X, Send, Sparkles, PlayCircle, ChevronDown,
  BookOpen, TrendingUp, Radio, Download, Settings, Paperclip, FileCheck, Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  analyzeInvestorQuestions,
  getActiveFiles,
  addActiveFile,
  removeActiveFile,
  subscribeFiles,
  type ParsedQuestion,
  type StoredFile
} from "@/lib/agentApi";
import ReactMarkdown from "react-markdown";

function StructuredQuestionsView({ questions }: { questions: ParsedQuestion[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));
  const allExpanded = expanded.size === questions.length;

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    setExpanded(allExpanded ? new Set() : new Set(questions.map((_, i) => i)));
  };

  const badgeClass = (val: string) => {
    const v = (val || "").toLowerCase();
    if (v.includes("high")) return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
    if (v.includes("medium")) return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
    return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-muted-foreground">{questions.length} Questions Predicted</span>
        <button onClick={toggleAll} className="text-xs text-primary hover:underline">
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden bg-background shadow-sm">
            <button onClick={() => toggle(i)} className="w-full text-left p-3 hover:bg-muted/50 transition-colors flex items-start gap-2.5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {q.number}
              </span>
              <span className="flex-1 text-sm font-medium leading-snug">{q.question}</span>
              <ChevronDown className={`h-4 w-4 ml-2 flex-shrink-0 text-muted-foreground transition-transform ${expanded.has(i) ? "rotate-180" : ""}`} />
            </button>
            {expanded.has(i) && (
              <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/20 space-y-3">
                {q.whyInvestorsCare && (
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Why investors care</p>
                    <div className="text-xs leading-relaxed whitespace-pre-wrap">{q.whyInvestorsCare}</div>
                  </div>
                )}
                {q.responseGuidance && (
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">What a strong management response should address</p>
                    <div className="text-xs leading-relaxed whitespace-pre-wrap text-foreground/90">{q.responseGuidance}</div>
                  </div>
                )}
                {q.supportingSource && (
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Supporting source</p>
                    <div className="text-xs text-muted-foreground italic whitespace-pre-wrap">{q.supportingSource}</div>
                  </div>
                )}
                {(q.likelihood || q.impact) && (
                  <div className="flex gap-4 pt-2 border-t border-border/50">
                    {q.likelihood && (
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Likelihood</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${badgeClass(q.likelihood)}`}>
                          {q.likelihood}
                        </span>
                      </div>
                    )}
                    {q.impact && (
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Sentiment Impact</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${badgeClass(q.impact)}`}>
                          {q.impact}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const defaultRemarks = `Good morning everyone, and thank you for joining our Q2 2026 Earnings Call. 
I'm Vasant Narasimhan, CEO of Novartis. Today I want to share how our focused strategy has continued to deliver strong performance and set the stage for sustainable growth.

We achieved 8% constant-currency sales growth this quarter driven by Entresto, Kesimpta, and Pluvicto. Our innovation engine remains strong with advances across cardiovascular, immunology, and oncology pipelines.

Operational discipline and portfolio focus are helping us create a leaner, more impactful Novartis as we move into 2026.

I'll now hand over to our CFO, Harry Kirsch, to walk through the financial results in detail before we open for Q&A.`;

const starterQuestions = [
  "I have an investor earnings call in 30 minutes. Based only on the attached documents, prepare me for the most likely questions institutional investors will ask during the earnings call.",
  "Generate the top 10 questions institutional investors are most likely to ask based on the latest quarter. Prioritize questions that could impact valuation and investor confidence.",
  "Compare recent quarters from the uploaded files. Identify what has changed and generate the investor questions most likely to arise because of those changes.",
  "Review our latest guidance and generate the toughest investor questions that challenge the assumptions behind it.",
  "Generate investor questions focused on the performance, sustainability, and competitive positioning of our key commercial products.",
];

export default function SessionWorkspace() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab 1 state
  const [remarks] = useState(defaultRemarks);

  // Attached files
  const [attachedFiles, setAttachedFiles] = useState<StoredFile[]>(getActiveFiles());

  useEffect(() => {
    return subscribeFiles(() => {
      setAttachedFiles([...getActiveFiles()]);
    });
  }, []);

  // Web search toggle — ON by default
  const [enableWebSearch, setEnableWebSearch] = useState<boolean>(false);

  // Tab 2 Chat State
  interface MessageItem {
    role: "executive" | "analyst";
    text: string;
    questions?: ParsedQuestion[];
    webIntelGathered?: boolean;
  }

  const [chatMessages, setChatMessages] = useState<MessageItem[]>(() => {
    const saved = sessionStorage.getItem("ir_chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Custom system prompt dialog
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(() => {
    return localStorage.getItem("ir_custom_prompt") || "";
  });

  useEffect(() => {
    sessionStorage.setItem("ir_chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      addActiveFile(files[i]);
    }
    toast({ title: "Files attached", description: `${files.length} document(s) ready for analysis.` });
    e.target.value = "";
  };

  const handleClearChat = () => {
    setChatMessages([]);
    sessionStorage.removeItem("ir_chatMessages");
  };

  const handleDownloadChat = () => {
    if (chatMessages.length === 0) return;
    const lines = chatMessages.map(msg =>
      `[${msg.role === "executive" ? "Executive" : "Analyst Prediction"}]\n${msg.text}`
    );
    const content = `Analyst Q&A Output\n${"=".repeat(50)}\n\n${lines.join("\n\n---\n\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investor-qa-analysis.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const submitQuery = async (queryText: string) => {
    const filesToSend = attachedFiles.map((f) => f.file);
    if (filesToSend.length === 0) {
      toast({
        title: "Document required",
        description: "Please attach at least one transcript or presentation file (.txt, .pdf, .docx, .csv) to analyze.",
        variant: "destructive",
      });
      return;
    }

    // Determine if this is the first message in the active chat
    const isFirstMessage = chatMessages.length === 0;

    setChatMessages(prev => [...prev, { role: "executive", text: queryText }]);
    setIsTyping(true);

    try {
      const response = await analyzeInvestorQuestions(
        queryText,
        filesToSend,
        customPrompt.trim() ? customPrompt : undefined,
        enableWebSearch,
        isFirstMessage  // <--- Pass to API
      );

      setChatMessages(prev => [
        ...prev,
        {
          role: "analyst",
          text: response.raw_output,
          questions: response.questions.length > 0 ? response.questions : undefined,
          webIntelGathered: response.med_affairs_intel_gathered,
        },
      ]);
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: err instanceof Error ? err.message : "Failed to run analysis",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Q2 2026 Earnings Call – Session Workspace</h1>
            <p className="text-sm text-muted-foreground">
              Predict investor questions using &amp; current earnings materials
            </p>
          </div>
          <Badge variant="secondary">Ready for Review</Badge>
        </div>

        {/* Mode Tabs */}
        <Tabs defaultValue="qa" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-2">
            <TabsTrigger value="remarks">Prepared Remarks Rehearsal</TabsTrigger>
            <TabsTrigger value="qa">Q&amp;A Practice</TabsTrigger>
          </TabsList>

          {/* Mode 1: Prepared Remarks Rehearsal */}
          <TabsContent value="remarks" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Prepared Remarks
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg max-h-[250px] overflow-y-auto mb-4">
                  <p className="text-sm leading-relaxed whitespace-pre-line">{remarks}</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Mic className="h-5 w-5" />
                  Voice Practice
                </h3>
                <div className="bg-muted/30 rounded-lg p-6 mb-4 flex items-center justify-center h-24">
                  <div className="text-sm text-muted-foreground">Recording module ready</div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Mode 2: Analyst Q&A Practice */}
          <TabsContent value="qa">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Chat area — 2/3 */}
              <div className="lg:col-span-2">
                <Card className="p-6 flex flex-col h-[750px]">
                  {/* Workspace Bar */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">Investor Questions Simulation</h3>
                    </div>

                    {/* Controls & Web Search Toggle */}
                    <div className="flex items-center gap-2">
                      {/* Web Search Button (ON by default) */}
                      <div
                        className={`hidden flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
                          enableWebSearch
                            ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300"
                            : "bg-muted/40 border-border text-muted-foreground"
                        }`}
                        onClick={() => setEnableWebSearch(!enableWebSearch)}
                        title="Search web & Medical Affairs intelligence"
                      >
                        <Globe className={`h-3.5 w-3.5 ${enableWebSearch ? "text-blue-600 animate-pulse" : ""}`} />
                        <span className="font-medium select-none">Web Search</span>
                        <Switch
                          checked={enableWebSearch}
                          onCheckedChange={setEnableWebSearch}
                          className="scale-75 data-[state=checked]:bg-blue-600"
                        />
                      </div>

                      <button
                        onClick={handleDownloadChat}
                        disabled={chatMessages.length === 0}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30"
                        title="Download output"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleClearChat}
                        disabled={chatMessages.length === 0}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-red-500 disabled:opacity-30"
                        title="Clear conversation"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSettingsOpen(true)}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="Edit System Prompt"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Attached Documents Row */}
                  <div className="flex items-center gap-2 mb-3 px-1 flex-wrap">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <Paperclip className="h-3.5 w-3.5" /> Attached Deck:
                    </span>
                    {attachedFiles.length === 0 ? (
                      <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200">
                        No files attached. Attach a document below to predict questions.
                      </span>
                    ) : (
                      attachedFiles.map((file) => (
                        <span key={file.id} className="inline-flex items-center gap-1 bg-muted text-xs px-2 py-1 rounded-md border">
                          <FileCheck className="h-3 w-3 text-green-600" />
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            onClick={() => removeActiveFile(file.id)}
                            className="hover:text-destructive ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".txt,.pdf,.docx,.csv,.xlsx"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs text-primary px-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      + Attach File
                    </Button>
                  </div>

                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
                    {chatMessages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="max-w-md p-6 bg-muted/40 rounded-xl text-center space-y-3">
                          <Brain className="h-8 w-8 mx-auto text-primary" />
                          <h4 className="font-semibold text-sm">Investor Questions Engine</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Attach your earnings materials above, then click a recommendation or type your question.
                          </p>
                        </div>
                      </div>
                    ) : (
                      chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === "executive" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`rounded-xl px-4 py-3 ${
                              msg.questions ? "w-full" : msg.role === "executive" ? "max-w-[80%]" : "max-w-[85%]"
                            } ${
                              msg.role === "executive"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {msg.role === "analyst" && (
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold tracking-wide uppercase text-muted-foreground">
                                  Predicted Analyst Q&amp;A
                                </span>
                                {msg.webIntelGathered && (
                                  <span className="inline-flex items-center gap-1 text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200">
                                    <Globe className="h-2.5 w-2.5" /> Web Intel Augmented
                                  </span>
                                )}
                              </div>
                            )}

                            {msg.role === "analyst" ? (
                              msg.questions ? (
                                <StructuredQuestionsView questions={msg.questions} />
                              ) : (
                                <div className="text-sm prose prose-sm max-w-none">
                                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                              )
                            ) : (
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                            )}
                          </div>
                        </div>
                      ))
                    )}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {enableWebSearch
                              ? "Gathering web intelligence & predicting questions..."
                              : "Analyzing documents..."}
                          </span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Row */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Input
                      placeholder="Ask the analyst simulator (e.g. Predict the top questions on margin pressure)..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (userInput.trim() && !isTyping) {
                            const q = userInput;
                            setUserInput("");
                            submitQuery(q);
                          }
                        }
                      }}
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        if (userInput.trim() && !isTyping) {
                          const q = userInput;
                          setUserInput("");
                          submitQuery(q);
                        }
                      }}
                      disabled={isTyping || !userInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Sidebar — 1/3 */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Quick Recommendations
                  </h3>
                  <div className="space-y-2">
                    {starterQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => submitQuery(q)}
                        disabled={isTyping}
                        className="w-full text-left px-3 py-2.5 rounded-lg border border-border bg-muted/30 hover:bg-muted/70 hover:border-primary/40 text-xs leading-snug transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* System Prompt Customizer Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Prompt &amp; Model Configuration
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-xs text-muted-foreground">
              Optionally override the backend system prompt. Leave blank to use <code>naive_prompt.txt</code> on the server. If overriding, ensure it contains the <code>&#123;context&#125;</code> placeholder.
            </p>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[250px] text-xs font-mono"
              placeholder="Leave blank to use default server prompt..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSettingsOpen(false)}>Close</Button>
              <Button onClick={() => {
                localStorage.setItem("ir_custom_prompt", customPrompt);
                toast({ title: "Prompt setting saved" });
                setSettingsOpen(false);
              }}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}