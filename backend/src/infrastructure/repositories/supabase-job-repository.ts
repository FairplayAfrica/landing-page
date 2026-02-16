import { supabase } from "../database/supabase-client";
import { IJobRepository } from "../../domain/repositories/job-repository.interface";
import { Job, CreateJobDTO, UpdateJobDTO } from "../../domain/entities/job";

/**
 * Supabase-backed Job Repository
 * Maps between DB snake_case and domain camelCase
 */

interface JobRow {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function toDomain(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    team: row.team,
    location: row.location,
    type: row.type as Job["type"],
    level: row.level as Job["level"],
    description: row.description,
    requirements: row.requirements,
    responsibilities: row.responsibilities,
    isActive: row.is_active,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

function toRow(data: CreateJobDTO | UpdateJobDTO): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if ("title" in data && data.title !== undefined) row.title = data.title;
  if ("team" in data && data.team !== undefined) row.team = data.team;
  if ("location" in data && data.location !== undefined)
    row.location = data.location;
  if ("type" in data && data.type !== undefined) row.type = data.type;
  if ("level" in data && data.level !== undefined) row.level = data.level;
  if ("description" in data && data.description !== undefined)
    row.description = data.description;
  if ("requirements" in data && data.requirements !== undefined)
    row.requirements = data.requirements;
  if ("responsibilities" in data && data.responsibilities !== undefined)
    row.responsibilities = data.responsibilities;
  if ("isActive" in data && data.isActive !== undefined)
    row.is_active = data.isActive;
  return row;
}

export class SupabaseJobRepository implements IJobRepository {
  async findAll(): Promise<Job[]> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to fetch jobs: ${error.message}`);
    return (data as JobRow[]).map(toDomain);
  }

  async findActive(): Promise<Job[]> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to fetch active jobs: ${error.message}`);
    return (data as JobRow[]).map(toDomain);
  }

  async findById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw new Error(`Failed to fetch job: ${error.message}`);
    }
    return toDomain(data as JobRow);
  }

  async create(dto: CreateJobDTO): Promise<Job> {
    const { data, error } = await supabase
      .from("jobs")
      .insert(toRow(dto))
      .select()
      .single();

    if (error) throw new Error(`Failed to create job: ${error.message}`);
    return toDomain(data as JobRow);
  }

  async update(id: string, dto: UpdateJobDTO): Promise<Job | null> {
    const { data, error } = await supabase
      .from("jobs")
      .update(toRow(dto))
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to update job: ${error.message}`);
    }
    return toDomain(data as JobRow);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await supabase.from("jobs").delete().eq("id", id);

    if (error) throw new Error(`Failed to delete job: ${error.message}`);
    return true;
  }
}
