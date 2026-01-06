'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Upload,
  Radar,
  FileWarning,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/modal';
import { staggerItem } from '@/shared/lib/animations';
import { cn } from '@/shared/lib/utils';

interface Step {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  details: string[];
}

const steps: Step[] = [
  {
    id: 'onboarding',
    number: '01',
    icon: UserCheck,
    title: 'Creator Onboarding & Verification',
    shortDescription: 'Quick account setup with identity verification',
    fullDescription:
      'Create your account in minutes. We verify your identity and content ownership to ensure only legitimate creators use our platform.',
    details: [
      'Simple registration process with email verification',
      'Identity verification to prevent misuse',
      'Content ownership documentation upload',
      'Organization/studio account options available',
    ],
  },
  {
    id: 'upload',
    number: '02',
    icon: Upload,
    title: 'Content Upload & Fingerprinting',
    shortDescription: 'Upload content and generate unique fingerprints',
    fullDescription:
      'Upload your films, videos, or audio content. Our system automatically generates a unique digital fingerprint that identifies your content.',
    details: [
      'Support for all major video and audio formats',
      'Automatic fingerprint generation using AI',
      'Secure cloud storage with encryption',
      'Batch upload for multiple files',
    ],
  },
  {
    id: 'monitoring',
    number: '03',
    icon: Radar,
    title: 'Continuous Web Monitoring',
    shortDescription: '24/7 scanning across platforms',
    fullDescription:
      'Our system continuously scans the web, including streaming sites, torrent networks, and social platforms for unauthorized copies of your content.',
    details: [
      'Real-time scanning of known piracy sites',
      'Social media monitoring (YouTube, Facebook, etc.)',
      'Torrent and file-sharing network scanning',
      'Geographic distribution tracking',
    ],
  },
  {
    id: 'reporting',
    number: '04',
    icon: FileWarning,
    title: 'Infringement Detection & Reporting',
    shortDescription: 'Instant alerts and actionable reports',
    fullDescription:
      'When unauthorized copies are found, you receive instant alerts with detailed reports. Take action directly from your dashboard.',
    details: [
      'Instant email and dashboard notifications',
      'Detailed infringement reports with evidence',
      'One-click takedown request generation',
      'Track takedown progress in real-time',
    ],
  },
];

export function HowItWorksSection() {
  const [selectedStep, setSelectedStep] = React.useState<Step | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Section id="how-it-works" className="bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-transparent h-32" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-teal-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          subtitle="Process"
          title="How FairPlay Africa Works"
          description="A simple, streamlined process designed to protect your content with minimal effort on your part."
        />

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={staggerItem}>
              <motion.button
                onClick={() => setSelectedStep(step)}
                onMouseEnter={() => setActiveIndex(index)}
                className="w-full text-left group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={cn(
                    'relative h-full rounded-2xl p-6 overflow-hidden',
                    'bg-slate-800/50 border border-slate-700/50',
                    'hover:border-teal-500/50 hover:bg-slate-800/80',
                    'transition-all duration-500'
                  )}
                >
                  {/* Step number background */}
                  <span className="absolute -top-4 -right-4 text-[120px] font-bold text-slate-700/20 leading-none select-none">
                    {step.number}
                  </span>

                  <div className="relative z-10">
                    {/* Icon with animated ring */}
                    <div className="relative inline-flex mb-6">
                      <div
                        className={cn(
                          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                          'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 blur-xl'
                        )}
                      />
                      <div className="relative p-3 rounded-2xl bg-slate-700/50 border border-slate-600/50 group-hover:border-teal-500/50 transition-colors">
                        <step.icon className="w-6 h-6 text-teal-400" />
                      </div>
                    </div>

                    {/* Step number */}
                    <span className="text-sm font-medium text-teal-400 mb-2 block">
                      Step {step.number}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {step.shortDescription}
                    </p>

                    {/* Learn more */}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-400 group-hover:text-teal-300 transition-colors">
                      Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px">
          <div className="max-w-7xl mx-auto px-8">
            <div className="relative h-0.5 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
          <DialogContent>
            {selectedStep && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-500/30">
                      <selectedStep.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-teal-400">
                        Step {selectedStep.number}
                      </span>
                      <DialogTitle className="text-2xl mt-1">
                        {selectedStep.title}
                      </DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="text-base">
                    {selectedStep.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    What happens in this step
                  </h4>
                  <ul className="space-y-3">
                    {selectedStep.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 p-1 rounded-full bg-teal-500/20">
                          <Check className="w-3 h-3 text-teal-400" />
                        </div>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setSelectedStep(null)}>
                    Got it
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}
