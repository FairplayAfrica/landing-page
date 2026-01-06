'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Fingerprint,
  Radar,
  LayoutDashboard,
  Users,
  BarChart3,
  X,
  ArrowRight,
  Sparkles,
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
import { staggerItem, cardHover } from '@/shared/lib/animations';
import { cn } from '@/shared/lib/utils';

interface Offer {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  whatItDoes: string;
  whyItMatters: string;
  howItWorks: string;
  value: string;
  gradient: string;
  size: 'large' | 'medium' | 'small';
}

const offers: Offer[] = [
  {
    id: 'fingerprinting',
    icon: Fingerprint,
    title: 'Content Fingerprinting',
    shortDescription: 'Unique digital signature for every piece of content',
    fullDescription:
      'Our advanced fingerprinting technology creates a unique digital DNA for your content, making it identifiable anywhere on the internet.',
    whatItDoes:
      'Creates a unique digital fingerprint of your audio and video content using advanced perceptual hashing algorithms.',
    whyItMatters:
      'Even if pirates modify, compress, or re-encode your content, the fingerprint remains detectable.',
    howItWorks:
      'Upload your content, and our system analyzes visual and audio patterns to generate a robust fingerprint that survives transcoding.',
    value:
      'Track your content anywhere it appears online, even in modified forms.',
    gradient: 'from-teal-500 to-emerald-500',
    size: 'large',
  },
  {
    id: 'monitoring',
    icon: Radar,
    title: 'Piracy Monitoring & Alerts',
    shortDescription: '24/7 automated web scanning',
    fullDescription:
      'Continuous monitoring across thousands of websites, torrent networks, and streaming platforms.',
    whatItDoes:
      'Scans the web continuously for unauthorized copies of your content across various platforms.',
    whyItMatters:
      'Early detection means faster action, minimizing revenue loss from piracy.',
    howItWorks:
      'Our crawlers search known piracy hotspots and legitimate platforms, matching found content against your fingerprints.',
    value: 'Get instant alerts when your content is found on unauthorized sites.',
    gradient: 'from-orange-500 to-amber-500',
    size: 'medium',
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: 'Infringement Dashboard',
    shortDescription: 'Complete visibility into piracy activity',
    fullDescription:
      'A comprehensive dashboard showing all detected infringements, their status, and takedown progress.',
    whatItDoes:
      'Centralizes all piracy detection data, takedown requests, and compliance status in one place.',
    whyItMatters:
      'Makes the complex task of managing content protection simple and actionable.',
    howItWorks:
      'View real-time data on where your content has been found, initiate takedowns, and track results.',
    value: 'Full control and visibility over your content protection efforts.',
    gradient: 'from-purple-500 to-violet-500',
    size: 'medium',
  },
  {
    id: 'redistribution',
    icon: Users,
    title: 'Affiliate Redistribution',
    shortDescription: 'Turn pirates into partners',
    fullDescription:
      'A revolutionary approach that offers detected infringers a chance to become legitimate distributors.',
    whatItDoes:
      'Provides a pathway for unauthorized distributors to become paid affiliates.',
    whyItMatters:
      'Instead of just fighting piracy, create new revenue streams from existing distribution networks.',
    howItWorks:
      'When infringement is detected, offer the distributor a chance to join our affiliate program with revenue sharing.',
    value: 'Convert lost revenue into new income streams.',
    gradient: 'from-cyan-500 to-blue-500',
    size: 'small',
  },
  {
    id: 'reports',
    icon: BarChart3,
    title: 'Creator Reports & Insights',
    shortDescription: 'Data-driven content protection',
    fullDescription:
      'Detailed analytics on your content distribution, piracy patterns, and protection effectiveness.',
    whatItDoes:
      'Generates comprehensive reports on content performance, piracy trends, and protection ROI.',
    whyItMatters:
      'Understanding piracy patterns helps you make better distribution and release decisions.',
    howItWorks:
      'Access weekly and monthly reports with visualizations of detection data, geographic distribution, and trend analysis.',
    value: 'Make informed decisions about your content strategy.',
    gradient: 'from-rose-500 to-pink-500',
    size: 'small',
  },
];

export function OffersSection() {
  const [selectedOffer, setSelectedOffer] = React.useState<Offer | null>(null);

  return (
    <Section id="offers" className="bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          subtitle="Features"
          title="What We Offer"
          description="Comprehensive tools designed specifically for African content creators to protect and monetize their work."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(200px,auto)]">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              variants={staggerItem}
              className={cn(
                offer.size === 'large' && 'md:col-span-2 md:row-span-2',
                offer.size === 'medium' && 'lg:col-span-2',
                offer.size === 'small' && 'lg:col-span-1'
              )}
            >
              <motion.button
                onClick={() => setSelectedOffer(offer)}
                className="w-full h-full text-left group"
                whileHover={cardHover}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={cn(
                    'relative h-full rounded-3xl p-6 lg:p-8 overflow-hidden',
                    'bg-gradient-to-br from-slate-800/60 to-slate-900/60',
                    'backdrop-blur-sm border border-slate-700/30',
                    'hover:border-slate-600/50 transition-all duration-500'
                  )}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                      `bg-gradient-to-br ${offer.gradient}`
                    )}
                  />

                  {/* Glow effect */}
                  <div
                    className={cn(
                      'absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500',
                      `bg-gradient-to-br ${offer.gradient}`
                    )}
                  />

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className={cn(
                        'inline-flex p-3 rounded-2xl mb-4 w-fit',
                        'bg-gradient-to-br',
                        offer.gradient,
                        'shadow-lg'
                      )}
                    >
                      <offer.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed flex-grow">
                      {offer.shortDescription}
                    </p>

                    {/* Learn more indicator */}
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium text-teal-400 group-hover:text-teal-300 transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
          <DialogContent className="max-w-2xl">
            {selectedOffer && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={cn(
                        'inline-flex p-3 rounded-2xl',
                        'bg-gradient-to-br',
                        selectedOffer.gradient
                      )}
                    >
                      <selectedOffer.icon className="w-6 h-6 text-white" />
                    </div>
                    <DialogTitle className="text-2xl">
                      {selectedOffer.title}
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-base">
                    {selectedOffer.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <h4 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">
                      What it does
                    </h4>
                    <p className="text-gray-300">{selectedOffer.whatItDoes}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <h4 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">
                      Why it matters
                    </h4>
                    <p className="text-gray-300">{selectedOffer.whyItMatters}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">
                      How it works
                    </h4>
                    <p className="text-gray-300">{selectedOffer.howItWorks}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">
                          Value to you
                        </h4>
                        <p className="text-gray-300">{selectedOffer.value}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setSelectedOffer(null)}>
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
