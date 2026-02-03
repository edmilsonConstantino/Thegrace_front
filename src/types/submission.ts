// types/submission.ts
// ✅ TIPOS ALINHADOS COM O BACKEND DJANGO

export type SubmissionType = "contact" | "suggestion" | "complaint";

export type SubmissionCategory = 
  | "general" 
  | "association" 
  | "events" 
  | "donations" 
  | "volunteering" 
  | "other";

export interface SubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  submission_type: SubmissionType;
  category: SubmissionCategory;
  subject: string;
  message: string;
}

export interface SubmissionResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  submission_type: SubmissionType;
  category: SubmissionCategory;
  subject: string;
  message: string;
  created_at: string;
}