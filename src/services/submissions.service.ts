// submissions.service.ts
// ✅ CORRIGIDO - Remove /api/ duplicado e ajusta payload

import http from "@/api/http";
import type { SubmissionPayload, SubmissionResponse } from "@/types/submission";

export async function createSubmission(payload: SubmissionPayload) {
  // ✅ Remove a barra inicial, pois baseURL já termina com /api
  // Antes: /contact/ → /api/api/contact/ ❌
  // Agora: contact/ → /api/contact/ ✅
  const { data } = await http.post<SubmissionResponse>("contact/", payload);
  return data;
}






