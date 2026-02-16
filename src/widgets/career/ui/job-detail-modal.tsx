"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X, MapPin, Users, Clock, Briefcase, ArrowUpRight } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import type { Job } from "@/entities/job";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobDetailModal({
  job,
  open,
  onOpenChange,
}: JobDetailModalProps) {
  if (!job) return null;

  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-3xl max-h-[85vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 p-6 md:p-8 shadow-2xl shadow-black/50 rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="mb-6">
            <Badge variant="default" className="mb-3">
              {job.team}
            </Badge>
            <DialogPrimitive.Title className="text-2xl md:text-3xl font-bold text-white">
              {job.title}
            </DialogPrimitive.Title>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-teal-500" />
                {job.type}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-500" />
                {job.level}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-500" />
                Posted {postedDate}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                About the Role
              </h3>
              <p className="text-gray-400 leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apply CTA */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <a href={`mailto:careers@fairplay.africa?subject=Application: ${job.title}`}>
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Apply for this role
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </a>
            <p className="mt-3 text-xs text-gray-500">
              Send your application to{" "}
              <a
                href="mailto:careers@fairplay.africa"
                className="text-teal-400 hover:underline"
              >
                careers@fairplay.africa
              </a>
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
