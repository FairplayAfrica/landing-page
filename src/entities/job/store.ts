import { supabase } from "@/shared/lib/supabase";
import type { Job, JobFormData } from "./types";

/**
 * Maps a Supabase DB row (snake_case) to the domain Job (camelCase)
 */
function toDomain(row: Record<string, unknown>): Job {
  return {
    id: row.id as string,
    title: row.title as string,
    team: row.team as string,
    location: row.location as string,
    type: row.type as Job["type"],
    level: row.level as Job["level"],
    description: row.description as string,
    requirements: row.requirements as string[],
    responsibilities: row.responsibilities as string[],
    isActive: row.is_active as boolean,
    createdAt: row.created_at as string,
  };
}

function toRow(
  data: Partial<JobFormData> & { isActive?: boolean },
): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (data.title !== undefined) row.title = data.title;
  if (data.team !== undefined) row.team = data.team;
  if (data.location !== undefined) row.location = data.location;
  if (data.type !== undefined) row.type = data.type;
  if (data.level !== undefined) row.level = data.level;
  if (data.description !== undefined) row.description = data.description;
  if (data.requirements !== undefined) row.requirements = data.requirements;
  if (data.responsibilities !== undefined)
    row.responsibilities = data.responsibilities;
  if (data.isActive !== undefined) row.is_active = data.isActive;
  return row;
}

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toDomain);
}

export async function getActiveJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toDomain);
}

export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return toDomain(data);
}

export async function createJob(formData: JobFormData): Promise<Job> {
  const { data, error } = await supabase
    .from("jobs")
    .insert(toRow(formData))
    .select()
    .single();

  if (error) throw new Error(error.message);
  return toDomain(data);
}

export async function updateJob(
  id: string,
  updates: Partial<JobFormData> & { isActive?: boolean },
): Promise<Job | null> {
  const { data, error } = await supabase
    .from("jobs")
    .update(toRow(updates))
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return toDomain(data);
}

export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  return !error;
}

export async function toggleJobStatus(id: string): Promise<Job | null> {
  const job = await getJobById(id);
  if (!job) return null;
  return updateJob(id, { isActive: !job.isActive });
}
