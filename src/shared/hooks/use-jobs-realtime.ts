"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/shared/lib/supabase";
import type { Job } from "@/entities/job/types";

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

interface UseJobsRealtimeOptions {
  activeOnly?: boolean;
}

/**
 * Hook that fetches jobs from Supabase and subscribes to real-time changes.
 * When any INSERT, UPDATE, or DELETE happens on the jobs table,
 * the local state is updated instantly.
 */
export function useJobsRealtime({
  activeOnly = false,
}: UseJobsRealtimeOptions = {}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeOnlyRef = useRef(activeOnly);
  activeOnlyRef.current = activeOnly;

  const fetchJobs = useCallback(async () => {
    try {
      let query = supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (activeOnlyRef.current) {
        query = query.eq("is_active", true);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setJobs((data ?? []).map(toDomain));
      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch jobs";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();

    // Subscribe to real-time changes on the jobs table
    const channel = supabase
      .channel("jobs-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        () => {
          // Re-fetch all jobs on any change for consistency
          fetchJobs();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs };
}
