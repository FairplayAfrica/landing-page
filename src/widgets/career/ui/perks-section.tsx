'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { staggerItem } from '@/shared/lib/animations';
import { cn } from '@/shared/lib/utils';

const perks = [
  {
    icon: Globe,
    title: 'Fully Remote',
    description:
      'Work from anywhere in Africa or beyond. We\u2019re remote-first from day one \u2014 no office politics, just output.',
    color: 'teal' as const,
  },
  {
    icon: Rocket,
    title: 'Ground-Floor Impact',
    description:
      'We\u2019re in incubation with CcHUB and raising funds this year. Join early and shape the product, culture, and company.',
    color: 'orange' as const,
  },
  {
    icon: TrendingUp,
    title: 'Equity & Upside',
    description:
      'Early team members get equity. As we grow, so does your stake in protecting African creativity.',
    color: 'teal' as const,
  },
  {
    icon: Users,
    title: 'Small Team, Big Voice',
    description:
      'No layers of bureaucracy. Your ideas ship fast, your feedback shapes the roadmap, and your work is visible.',
    color: 'orange' as const,
  },
  {
    icon: Zap,
    title: 'Real Problems, Real Impact',
    description:
      'You won\u2019t be building another CRUD app. You\u2019ll be tackling piracy that costs African creators billions yearly.',
    color: 'teal' as const,
  },
  {
    icon: GraduationCap,
    title: 'Learn by Doing',
    description:
      'Mentorship from CcHUB\u2019s network, access to investor events, and the freedom to experiment and grow fast.',
    color: 'orange' as const,
  },
];

export function PerksSection() {
  return (
    <Section className="bg-slate-950">
      <SectionHeader
        title="Perks of being on the dream team"
        description="We're an early-stage startup in incubation with CcHUB — here's what you get when you join us on the ground floor."
        align="left"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {perks.map((perk) => (
          <motion.div
            key={perk.title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'rounded-2xl p-6 transition-all duration-300',
              'bg-white/5 backdrop-blur-xl border border-white/10',
              'hover:border-teal-500/30'
            )}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                perk.color === 'teal'
                  ? 'bg-teal-500/10 text-teal-400'
                  : 'bg-orange-500/10 text-orange-400'
              )}
            >
              <perk.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{perk.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{perk.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
