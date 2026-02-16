export interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  level: "Junior" | "Mid-level" | "Senior" | "Lead" | "Manager";
  description: string;
  requirements: string[];
  responsibilities: string[];
  createdAt: string;
  isActive: boolean;
}

export type JobFormData = Omit<Job, "id" | "createdAt" | "isActive">;

export const JOB_TEAMS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing & Sales",
  "Data Science",
  "Operations",
  "Legal & Compliance",
  "Finance",
  "People & Culture",
] as const;

export const JOB_LOCATIONS = ["Lagos, Nigeria"] as const;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export const JOB_LEVELS = [
  "Junior",
  "Mid-level",
  "Senior",
  "Lead",
  "Manager",
] as const;
