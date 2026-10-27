export interface ParsedQuestion {
  number: string | number;
  question: string;
  whyInvestorsCare: string;
  responseGuidance: string;
  supportingSource: string;
  likelihood: string;
  impact: string;
}

export interface AnalyzeResponse {
  questions: ParsedQuestion[];
  question_count: number;
  meta: {
    file_count: number;
    total_chars: number;
    truncated_files: string[];
  };
  med_affairs_intel_gathered?: boolean;
  raw_output: string;
}

export interface StoredFile {
  id: string;
  name: string;
  size: number;
  file: File;
}

// In-memory document storage across components
let activeFiles: StoredFile[] = [];
const fileListeners: Array<() => void> = [];

export function getActiveFiles(): StoredFile[] {
  return activeFiles;
}

export function addActiveFile(file: File): StoredFile {
  const stored: StoredFile = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: file.name,
    size: file.size,
    file,
  };
  activeFiles = [...activeFiles, stored];
  fileListeners.forEach((l) => l());
  return stored;
}

export function removeActiveFile(id: string): void {
  activeFiles = activeFiles.filter((f) => f.id !== id);
  fileListeners.forEach((l) => l());
}

export function subscribeFiles(cb: () => void) {
  fileListeners.push(cb);
  return () => {
    const idx = fileListeners.indexOf(cb);
    if (idx > -1) fileListeners.splice(idx, 1);
  };
}

export async function analyzeInvestorQuestions(
  question: string,
  files: File[],
  systemPrompt?: string,
  enableWebSearch: boolean = false,
  isFirstMessage: boolean = false  // <--- Add this parameter
): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append("question", question);

  files.forEach((f) => {
    formData.append("files", f);
  });

  if (systemPrompt && systemPrompt.trim()) {
    formData.append("system_prompt", systemPrompt);
  }

  formData.append("enable_web_search", enableWebSearch ? "true" : "");
  formData.append("is_first_message", isFirstMessage ? "true" : "false"); // <--- Send flag

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.error || `Server error: ${res.statusText}`);
  }

  const data = await res.json();

  const normalizedQuestions: ParsedQuestion[] = (data.questions || []).map((q: any) => ({
    number: q.number,
    question: q.question,
    whyInvestorsCare: q.why_investors_care || "",
    responseGuidance: q.strong_response || "",
    supportingSource: q.supporting_source || "",
    likelihood: q.likelihood || "",
    impact: q.sentiment_impact || "",
  }));

  return {
    questions: normalizedQuestions,
    question_count: data.question_count || normalizedQuestions.length,
    meta: data.meta || { file_count: files.length, total_chars: 0, truncated_files: [] },
    med_affairs_intel_gathered: Boolean(data.med_affairs_intel_gathered),
    raw_output: data.raw_output || "",
  };
}