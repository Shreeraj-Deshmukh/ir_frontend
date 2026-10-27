import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Users, ShieldCheck, CheckCircle2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getActiveFiles, addActiveFile, removeActiveFile, subscribeFiles, type StoredFile } from "@/lib/agentApi";
import { useToast } from "@/hooks/use-toast";

export default function IRHub() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<StoredFile[]>(getActiveFiles());

  useEffect(() => {
    return subscribeFiles(() => {
      setFiles([...getActiveFiles()]);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;
    for (let i = 0; i < uploaded.length; i++) {
      addActiveFile(uploaded[i]);
    }
    toast({ title: "Files added", description: `${uploaded.length} source(s) ready for rehearsal simulation.` });
    e.target.value = "";
  };

  const handleDelete = (file: StoredFile) => {
    removeActiveFile(file.id);
    toast({ title: "File removed", description: `${file.name} removed from active context.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">IR Data Hub</h1>
          <p className="text-muted-foreground">
            Manage data inputs and reference materials for investor call rehearsals
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Active Document Sources ({files.length})</h2>
            </div>
            <div className="space-y-2">
              {files.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents uploaded yet. Add files below.</p>
              ) : (
                files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 group border">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={() => handleDelete(file)}
                      className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Upload New Data</h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Upload earnings transcripts, investor presentations, or pipeline documents.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".txt,.pdf,.docx,.csv,.xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
                {files.length > 0 && (
                  <Button onClick={() => navigate("/session/workspace/1")}>
                    Go to Q&amp;A Simulation &rarr;
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Governance Note</h2>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-md">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="text-sm">Documents are processed securely.</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}