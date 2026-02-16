import { z } from "zod";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;
const jobLevels = ["Junior", "Mid-level", "Senior", "Lead", "Manager"] as const;

export const createJobSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  team: z.string().min(1, "Team is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(jobTypes),
  level: z.enum(jobLevels),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.array(z.string().min(1)).min(1, "At least one requirement"),
  responsibilities: z
    .array(z.string().min(1))
    .min(1, "At least one responsibility"),
});

export const updateJobSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  team: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  type: z.enum(jobTypes).optional(),
  level: z.enum(jobLevels).optional(),
  description: z.string().min(10).optional(),
  requirements: z.array(z.string().min(1)).min(1).optional(),
  responsibilities: z.array(z.string().min(1)).min(1).optional(),
  isActive: z.boolean().optional(),
});
