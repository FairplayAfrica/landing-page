"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/shared/lib/animations";

export function CareerHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-32 w-96 h-96 bg-orange-500/15 rounded-full blur-[128px]"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={fadeInUp}>
          <Badge variant="default" className="mb-6 text-sm px-4 py-1.5">
            Careers
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
        >
          Ready to protect{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300">
            African creativity
          </span>
          ?
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Come join a team that&apos;s building the infrastructure to protect
          and monetize content for millions of creators across Africa.
        </motion.p>
      </motion.div>
    </section>
  );
}
