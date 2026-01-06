'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Target,
  Eye,
  Sparkles,
  Trophy,
  Users,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { staggerItem, fadeInUp } from '@/shared/lib/animations';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alabi Ramat',
    role: 'Team Lead & Product Manager',
    description:
      'Leading product strategy, vision, and team coordination for FairPlay Africa.',
    image: '/team/ramat.jpg',
  },
  {
    id: '2',
    name: 'Teslim Sadiq',
    role: 'Software Engineer',
    description:
      'Building the core platform and fingerprinting technology.',
    image: '/team/teslim.jpg',
  },
  {
    id: '3',
    name: 'Warris A.',
    role: 'Backend Engineer',
    description:
      'Developing monitoring systems, APIs, and server infrastructure.',
    image: '/team/warris.jpg',
  },
  {
    id: '4',
    name: 'Alabi Sabtiu',
    role: 'Product Designer',
    description:
      'Crafting intuitive user experiences and the FairPlay Africa brand identity.',
    image: '/team/sabtiu.jpg',
  },
];

const galleryImages = [
  { id: '1', src: '/gallery/hackathon-1.jpg', alt: 'ACM Hackathon pitching' },
  { id: '2', src: '/gallery/hackathon-2.jpg', alt: 'Team working session' },
  { id: '3', src: '/gallery/hackathon-3.jpg', alt: 'Winning announcement' },
  { id: '4', src: '/gallery/hackathon-4.jpg', alt: 'Team celebration' },
];

export function AboutSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <>
      {/* Story Section */}
      <Section id="story" className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <SectionHeader
            subtitle="Our Story"
            title="Born from the Africa Creative Market Hackathon"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                FairPlay Africa was born at the{' '}
                <span className="text-teal-400 font-semibold">
                  Africa Creative Market Hackathon
                </span>
                , where our team came together with a shared frustration: watching
                talented African filmmakers lose their work to piracy.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We saw films being uploaded to illegal sites within hours of release.
                We saw creators losing potential revenue and control over their work.
                We saw an industry crying out for a solution built for its unique
                challenges.
              </p>
              <p className="text-gray-400 leading-relaxed">
                So we built FairPlay Africa—not just another anti-piracy tool, but a
                comprehensive platform designed from the ground up for African
                creators, African infrastructure, and African distribution patterns.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                  <Trophy className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Hackathon Winners</p>
                  <p className="text-sm text-gray-400">
                    Africa Creative Market 2024
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Gallery Carousel */}
            <motion.div variants={fadeInUp} className="relative">
              <div ref={emblaRef} className="overflow-hidden rounded-2xl">
                <div className="flex">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="flex-none w-full">
                      <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden">
                        {/* Placeholder for actual images */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Sparkles className="w-12 h-12 text-teal-500/30 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">{image.alt}</p>
                            <p className="text-gray-600 text-xs mt-1">
                              Add image: {image.src}
                            </p>
                          </div>
                        </div>
                        {/* Uncomment when you have actual images */}
                        {/* <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollPrev}
                  className="rounded-full bg-slate-800/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollNext}
                  className="rounded-full bg-slate-800/80 backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-transparent h-32" />

        <div className="relative z-10 grid md:grid-cols-2 gap-8">
          <motion.div variants={staggerItem}>
            <Card variant="bento" className="h-full" glow>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-500/30">
                  <Target className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <Badge variant="default" className="mb-2">
                    Mission
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Protect African creative work using technology built for African
                realities.
              </p>
              <p className="text-gray-400 mt-4 leading-relaxed">
                We believe every African creator deserves the same level of content
                protection as creators anywhere in the world. Our mission is to make
                that a reality.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card variant="bento" className="h-full" glow>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/30">
                  <Eye className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <Badge variant="accent" className="mb-2">
                    Vision
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Become Africa&apos;s most trusted anti-piracy and rights protection
                platform.
              </p>
              <p className="text-gray-400 mt-4 leading-relaxed">
                We envision a future where African content is valued, protected, and
                fairly monetized—enabling creators to focus on what they do best:
                creating.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <SectionHeader
            subtitle="Team"
            title="Meet the Team"
            description="A passionate team dedicated to protecting African creativity."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={staggerItem}>
                <Card variant="bento" className="h-full text-center" hover>
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <Users className="w-10 h-10 text-gray-500" />
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-teal-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {member.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advisors Note */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50">
              <Lightbulb className="w-5 h-5 text-teal-400" />
              <p className="text-gray-300">
                <span className="font-semibold text-white">Advisory board</span>{' '}
                coming soon
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
