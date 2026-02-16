"use client";

import * as React from "react";
import {
  CareerHero,
  JobListSection,
  JobDetailModal,
  PerksSection,
} from "@/widgets/career";
import { useJobsRealtime } from "@/shared/hooks/use-jobs-realtime";
import type { Job } from "@/entities/job";

export default function CareerPage() {
  const { jobs, loading } = useJobsRealtime({ activeOnly: true });
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  function handleSelectJob(job: Job) {
    setSelectedJob(job);
    setModalOpen(true);
  }

  return (
    <div className="pt-0">
      <CareerHero />
      <JobListSection
        jobs={jobs}
        loading={loading}
        onSelectJob={handleSelectJob}
      />
      <PerksSection />
      <JobDetailModal
        job={selectedJob}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
