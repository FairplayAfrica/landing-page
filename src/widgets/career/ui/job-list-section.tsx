"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  ArrowRight,
  Briefcase,
  ChevronDown,
  X,
} from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/shared/lib/animations";
import type { Job } from "@/entities/job";
import { JOB_TEAMS, JOB_LOCATIONS } from "@/entities/job";

interface JobListSectionProps {
  jobs: Job[];
  loading?: boolean;
  onSelectJob: (job: Job) => void;
}

export function JobListSection({
  jobs,
  loading = false,
  onSelectJob,
}: JobListSectionProps) {
  const [search, setSearch] = React.useState("");
  const [teamFilter, setTeamFilter] = React.useState("All");
  const [locationFilter, setLocationFilter] = React.useState("All");
  const [teamOpen, setTeamOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);

  const teamRef = React.useRef<HTMLDivElement>(null);
  const locationRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (teamRef.current && !teamRef.current.contains(e.target as Node))
        setTeamOpen(false);
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      )
        setLocationOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredJobs = React.useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.team.toLowerCase().includes(search.toLowerCase());
      const matchesTeam = teamFilter === "All" || job.team === teamFilter;
      const matchesLocation =
        locationFilter === "All" || job.location === locationFilter;
      return matchesSearch && matchesTeam && matchesLocation;
    });
  }, [jobs, search, teamFilter, locationFilter]);

  const teams = ["All", ...JOB_TEAMS];
  const locations = ["All", ...JOB_LOCATIONS];

  const hasActiveFilters =
    search !== "" || teamFilter !== "All" || locationFilter !== "All";

  function clearFilters() {
    setSearch("");
    setTeamFilter("All");
    setLocationFilter("All");
  }

  return (
    <section className="py-12 md:py-16 bg-slate-950">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Search & Filters */}
        <motion.div
          variants={fadeInUp}
          className="mb-10 flex flex-col md:flex-row gap-3 items-stretch md:items-center"
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search role..."
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            />
          </div>

          {/* Team Filter */}
          <div ref={teamRef} className="relative">
            <button
              onClick={() => {
                setTeamOpen(!teamOpen);
                setLocationOpen(false);
              }}
              className="flex items-center gap-2 h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white hover:border-slate-600 transition-all min-w-[160px] justify-between"
            >
              <Users className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="truncate">{teamFilter}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${teamOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {teamOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-50 top-full mt-2 w-56 rounded-xl border border-slate-700 bg-slate-800 shadow-2xl shadow-black/40 overflow-hidden"
                >
                  {teams.map((team) => (
                    <button
                      key={team}
                      onClick={() => {
                        setTeamFilter(team);
                        setTeamOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        teamFilter === team
                          ? "bg-teal-500/20 text-teal-400"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      {team}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location Filter */}
          <div ref={locationRef} className="relative">
            <button
              onClick={() => {
                setLocationOpen(!locationOpen);
                setTeamOpen(false);
              }}
              className="flex items-center gap-2 h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm text-white hover:border-slate-600 transition-all min-w-[180px] justify-between"
            >
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="truncate">{locationFilter}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${locationOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-50 top-full mt-2 w-60 rounded-xl border border-slate-700 bg-slate-800 shadow-2xl shadow-black/40 overflow-hidden"
                >
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocationFilter(loc);
                        setLocationOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        locationFilter === loc
                          ? "bg-teal-500/20 text-teal-400"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 h-12 px-4 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </motion.div>

        {/* Available Roles Header */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-3 mb-6"
        >
          <h2 className="text-xl font-bold text-white">Available Roles</h2>
          <Badge variant="accent" className="text-xs">
            {filteredJobs.length}
          </Badge>
        </motion.div>

        {/* Job Table */}
        <motion.div variants={fadeInUp}>
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_auto] gap-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-slate-800">
            <span>Role</span>
            <span>Team</span>
            <span>Location</span>
            <span className="w-10" />
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="px-6 py-5 border-b border-slate-800/50 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-[2] h-4 bg-slate-800 rounded w-3/4" />
                    <div className="flex-1 h-4 bg-slate-800 rounded w-1/2 hidden md:block" />
                    <div className="flex-1 h-4 bg-slate-800 rounded w-2/3 hidden md:block" />
                    <div className="w-4 h-4 bg-slate-800 rounded hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job Rows */}
          {!loading && (
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, i) => (
                  <motion.button
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    onClick={() => onSelectJob(job)}
                    className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-2 md:gap-4 items-center px-6 py-5 text-left border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  >
                    <div>
                      <span className="text-white font-medium group-hover:text-teal-400 transition-colors">
                        {job.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1 md:hidden">
                        <span className="text-xs text-gray-500">
                          {job.team}
                        </span>
                        <span className="text-gray-700">·</span>
                        <span className="text-xs text-gray-500">
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <span className="hidden md:block text-sm text-gray-400">
                      {job.team}
                    </span>
                    <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-teal-500/70" />
                      {job.location}
                    </div>
                    <ArrowRight className="hidden md:block w-4 h-4 text-gray-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center"
                >
                  <Briefcase className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    No roles match your filters
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Try adjusting your search or filters
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
