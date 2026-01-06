'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/shared/ui/section';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { fadeInUp, scaleIn } from '@/shared/lib/animations';

export function DemoSection() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <Section id="demo" className="bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          subtitle="Product Demo"
          title="See How FairPlay Africa Works"
          description="Watch our platform in action and discover how we protect your creative work from piracy."
        />

        {/* Video Container */}
        <motion.div variants={scaleIn} className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-slate-800/50 border border-slate-700/50 shadow-2xl shadow-black/50">
            {/* Aspect ratio container */}
            <div className="relative aspect-video">
              {!isPlaying ? (
                <>
                  {/* Thumbnail / Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
                    </div>

                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50" />

                    {/* FairPlay Logo/Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-center"
                      >
                        <h3 className="text-4xl md:text-6xl font-bold text-white/20">
                          FairPlay<span className="text-teal-500/30">Africa</span>
                        </h3>
                        <p className="text-gray-500 mt-2">Platform Demo</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      {/* Pulse rings */}
                      <div className="absolute inset-0 -m-4">
                        <motion.div
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-full h-full rounded-full bg-teal-500/30"
                        />
                      </div>
                      <div className="absolute inset-0 -m-8">
                        <motion.div
                          animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="w-full h-full rounded-full bg-teal-500/20"
                        />
                      </div>

                      {/* Play button */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-shadow">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </motion.button>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm">
                      3:45
                    </Badge>
                  </div>
                </>
              ) : (
                // Video iframe placeholder - replace with actual video
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Video Player</p>
                    <p className="text-gray-500 text-sm">
                      Replace with your demo video embed
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4"
                      onClick={() => setIsPlaying(false)}
                    >
                      Close
                    </Button>
                  </div>
                  {/*
                  Uncomment and add your video URL:
                  <iframe
                    src="YOUR_VIDEO_URL"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  */}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* CTA below video */}
        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Ready to protect your creative work?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              Create an Account
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Badge variant="accent" className="text-sm py-2 px-4">
              MVP launching soon
            </Badge>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
