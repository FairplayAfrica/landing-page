"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  Briefcase,
  MapPin,
  Users,
  Save,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import { useJobsRealtime } from "@/shared/hooks/use-jobs-realtime";
import {
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  JOB_TEAMS,
  JOB_LOCATIONS,
  JOB_TYPES,
  JOB_LEVELS,
} from "@/entities/job";
import type { Job, JobFormData } from "@/entities/job";

const emptyForm: JobFormData = {
  title: "",
  team: "Engineering",
  location: "Remote, Africa",
  type: "Full-time",
  level: "Mid-level",
  description: "",
  requirements: [""],
  responsibilities: [""],
};

export default function AdminCareerPage() {
  const { jobs, loading } = useJobsRealtime();
  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<JobFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(job: Job) {
    setForm({
      title: job.title,
      team: job.team,
      location: job.location,
      type: job.type,
      level: job.level,
      description: job.description,
      requirements: [...job.requirements],
      responsibilities: [...job.responsibilities],
    });
    setEditingId(job.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const cleaned = {
        ...form,
        requirements: form.requirements.filter((r) => r.trim() !== ""),
        responsibilities: form.responsibilities.filter((r) => r.trim() !== ""),
      };

      if (editingId) {
        await updateJob(editingId, cleaned);
      } else {
        await createJob(cleaned);
      }
      resetForm();
    } catch (err) {
      console.error("Failed to save job:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteJob(id);
    setDeleteConfirm(null);
  }

  async function handleToggle(id: string) {
    await toggleJobStatus(id);
  }

  function updateArrayField(
    field: "requirements" | "responsibilities",
    index: number,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  }

  function addArrayField(field: "requirements" | "responsibilities") {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  }

  function removeArrayField(
    field: "requirements" | "responsibilities",
    index: number,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  const activeCount = jobs.filter((j) => j.isActive).length;

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/career"
              className="p-2 rounded-xl bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Career Admin
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {jobs.length} total roles · {activeCount} active
              </p>
            </div>
          </div>
          {!showForm && (
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              New Job
            </Button>
          )}
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="mb-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editingId ? "Edit Job Opening" : "Create New Job Opening"}
                </h2>
                <button
                  type="button"
                  onClick={resetForm}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="md:col-span-2">
                  <Input
                    label="Job Title"
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="e.g. Senior Backend Engineer"
                    required
                  />
                </div>

                {/* Team */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Team
                  </label>
                  <select
                    value={form.team}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, team: e.target.value }))
                    }
                    className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                  >
                    {JOB_TEAMS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Location
                  </label>
                  <select
                    value={form.location}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, location: e.target.value }))
                    }
                    className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                  >
                    {JOB_LOCATIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        type: e.target.value as Job["type"],
                      }))
                    }
                    className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                  >
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Level
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        level: e.target.value as Job["level"],
                      }))
                    }
                    className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                  >
                    {JOB_LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Textarea
                    label="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Describe the role, team, and what the person will be working on..."
                    required
                  />
                </div>

                {/* Requirements */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-300">
                      Requirements
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("requirements")}
                      className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      + Add requirement
                    </button>
                  </div>
                  {form.requirements.map((req, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={req}
                        onChange={(e) =>
                          updateArrayField("requirements", i, e.target.value)
                        }
                        placeholder={`Requirement ${i + 1}`}
                        className="flex-1 h-10 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      />
                      {form.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField("requirements", i)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Responsibilities */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-300">
                      Responsibilities
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("responsibilities")}
                      className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      + Add responsibility
                    </button>
                  </div>
                  {form.responsibilities.map((resp, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={resp}
                        onChange={(e) =>
                          updateArrayField(
                            "responsibilities",
                            i,
                            e.target.value,
                          )
                        }
                        placeholder={`Responsibility ${i + 1}`}
                        className="flex-1 h-10 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      />
                      {form.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayField("responsibilities", i)
                          }
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-700/50">
                <Button type="submit" className="gap-2" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingId ? "Update Job" : "Create Job"}
                </Button>
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Job List */}
        <div className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/30 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-700 rounded w-1/3" />
                      <div className="h-3 bg-slate-800 rounded w-1/2" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg" />
                      <div className="w-8 h-8 bg-slate-800 rounded-lg" />
                      <div className="w-8 h-8 bg-slate-800 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 text-center">
              <Briefcase className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No job openings yet</p>
              <p className="text-gray-600 text-sm mt-1">
                Create your first job opening to get started
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-5 rounded-xl border transition-all",
                  job.isActive
                    ? "bg-slate-800/40 border-slate-700/50"
                    : "bg-slate-900/40 border-slate-800/30 opacity-60",
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-medium truncate">
                        {job.title}
                      </h3>
                      <Badge
                        variant={job.isActive ? "success" : "secondary"}
                        className="text-[10px]"
                      >
                        {job.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {job.team}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" /> {job.type} ·{" "}
                        {job.level}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggle(job.id)}
                      title={job.isActive ? "Deactivate" : "Activate"}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        job.isActive
                          ? "text-green-400 hover:bg-green-500/10"
                          : "text-gray-500 hover:bg-gray-500/10",
                      )}
                    >
                      {job.isActive ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      title="Edit"
                      className="p-2 rounded-lg text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteConfirm === job.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:bg-slate-700/50 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(job.id)}
                        title="Delete"
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
