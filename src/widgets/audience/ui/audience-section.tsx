'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Film,
  Clapperboard,
  Building2,
  Video,
  Scale,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { fadeInUp } from '@/shared/lib/animations';

interface Audience {
  id: string;
  icon: React.ElementType;
  title: string;
  painPoint: string;
  solution: string;
  relevance: string;
  gradient: string;
}

const audiences: Audience[] = [
  {
    id: 'independent',
    icon: Film,
    title: 'Independent Filmmakers',
    painPoint:
      'You pour your savings into a film, only to find it on pirate sites before your premiere even happens.',
    solution:
      'FairPlay detects unauthorized copies within hours and helps you take them down, protecting your box office and streaming revenue.',
    relevance:
      'As an indie filmmaker, every view counts. We make sure your hard work pays off.',
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    id: 'nollywood',
    icon: Clapperboard,
    title: 'Nollywood Producers',
    painPoint:
      'Your Nollywood productions leak on Telegram and WhatsApp groups almost instantly, killing theater revenue.',
    solution:
      'Our monitoring extends to social platforms and messaging groups where Nollywood content is commonly pirated.',
    relevance:
      'Built by Africans who understand the unique distribution challenges of Nollywood.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'studios',
    icon: Building2,
    title: 'Film Studios',
    painPoint:
      'Managing content protection for multiple titles across various platforms is complex and expensive.',
    solution:
      'Centralized dashboard for all your titles with bulk monitoring, reporting, and takedown management.',
    relevance:
      'Enterprise-grade protection at a price point designed for African studios.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    id: 'creators',
    icon: Video,
    title: 'Digital Creators',
    painPoint:
      'Your YouTube content or online courses get stolen and re-uploaded, stealing your audience and revenue.',
    solution:
      'Monitor platforms where your content might be re-uploaded without permission and protect your digital assets.',
    relevance:
      'Whether you make content for YouTube, TikTok, or online courses, your work deserves protection.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'distributors',
    icon: Scale,
    title: 'Rights Owners & Distributors',
    painPoint:
      'Tracking where licensed content ends up and ensuring compliance is a full-time job.',
    solution:
      'Comprehensive tracking of where your licensed content appears, with compliance monitoring and reporting.',
    relevance:
      'Protect the value of your catalog and ensure licensees meet their obligations.',
    gradient: 'from-rose-500 to-pink-500',
  },
];

export function AudienceSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Section id="audience" className="bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          subtitle="Who It's For"
          title="Built for African Creators"
          description="No matter where you are in your creative journey, FairPlay Africa has your back."
        />

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {audiences.map((audience, index) => (
                <div
                  key={audience.id}
                  className="flex-none w-full md:w-[80%] lg:w-[60%] px-4"
                >
                  <motion.div
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{
                      opacity: selectedIndex === index ? 1 : 0.5,
                      scale: selectedIndex === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      'rounded-3xl p-8 md:p-10 h-full',
                      'bg-gradient-to-br from-slate-800/60 to-slate-900/60',
                      'backdrop-blur-sm border border-slate-700/30',
                      selectedIndex === index && 'border-slate-600/50'
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        'inline-flex p-4 rounded-2xl mb-6',
                        'bg-gradient-to-br',
                        audience.gradient
                      )}
                    >
                      <audience.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {audience.title}
                    </h3>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2">
                          Your Pain Point
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {audience.painPoint}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">
                          How FairPlay Helps
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {audience.solution}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-700/50">
                        <p className="text-gray-400 italic">
                          &ldquo;{audience.relevance}&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {audiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    selectedIndex === index
                      ? 'w-8 bg-teal-500'
                      : 'bg-slate-600 hover:bg-slate-500'
                  )}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
