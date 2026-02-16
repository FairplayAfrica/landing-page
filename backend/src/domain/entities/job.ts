/**
 * Domain Entity: Job
 * Pure domain model — no framework dependencies
 */
export interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  type: JobType;
  level: JobLevel;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type JobLevel = "Junior" | "Mid-level" | "Senior" | "Lead" | "Manager";

export interface CreateJobDTO {
  title: string;
  team: string;
  location: string;
  type: JobType;
  level: JobLevel;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface UpdateJobDTO extends Partial<CreateJobDTO> {
  isActive?: boolean;
}
