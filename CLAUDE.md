# ir_frontend
Vite + React + TS + shadcn UI (originally Lovable). Run: `npm i && npm run dev`; build: `npm run build`.
- Main flow: `src/pages/SessionWorkspace.tsx` -> `src/lib/agentApi.ts` -> `POST /api/analyze`.
- `vercel.json` rewrites `/api/*` to the backend: replace `YOUR-BACKEND.vercel.app` with your deployed backend URL (for local dev add a Vite proxy to http://localhost:8000).
- Other pages (Dashboard, Personas, Library, etc.) are mostly static UI.
