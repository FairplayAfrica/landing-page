"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  TrendingUp,
  BarChart3,
  Globe,
  Users,
  Building2,
  Tv,
  GraduationCap,
  Cpu,
  ArrowRight,
  Mail,
  Check,
} from "lucide-react";
import { Section, SectionHeader } from "@/shared/ui/section";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { staggerItem, fadeInUp, cardHover } from "@/shared/lib/animations";

const whyPartner = [
  {
    icon: Users,
    title: "Access to Creative Ecosystem",
    description:
      "Connect with Africa's growing community of filmmakers, studios, and content creators.",
  },
  {
    icon: TrendingUp,
    title: "Ethical Monetization",
    description:
      "Help build sustainable revenue streams that benefit creators and the industry.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description:
      "Gain valuable insights into content distribution and consumption patterns across Africa.",
  },
  {
    icon: Globe,
    title: "Africa-First Approach",
    description:
      "Be part of building infrastructure specifically designed for African markets.",
  },
];

const idealPartners = [
  {
    icon: Users,
    title: "Film Guilds",
    description:
      "Protect your members and advocate for creator rights with technology backing.",
  },
  {
    icon: Building2,
    title: "Production Houses",
    description:
      "Safeguard your productions and maximize returns on your investments.",
  },
  {
    icon: Tv,
    title: "Streaming Platforms",
    description:
      "Ensure content exclusivity and protect your licensed content library.",
  },
  {
    icon: GraduationCap,
    title: "Creative Institutions",
    description:
      "Educate the next generation about content protection and digital rights.",
  },
  {
    icon: Cpu,
    title: "Technology Partners",
    description:
      "Integrate our APIs and build complementary solutions for the creative industry.",
  },
];

const partnershipSteps = [
  {
    number: "01",
    title: "Reach Out",
    description:
      "Contact us via our partnership form or email to start the conversation.",
  },
  {
    number: "02",
    title: "Define Scope",
    description:
      "We'll work together to define partnership goals and collaboration areas.",
  },
  {
    number: "03",
    title: "Pilot Collaboration",
    description:
      "Start with a pilot program to test our partnership and measure results.",
  },
];

export function PartnersSection() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-slate-950 pt-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div variants={fadeInUp}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20">
              Partnership Program
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Partner with{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              FairPlay Africa
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 leading-relaxed"
          >
            Protect creativity. Build ethical distribution systems.
            <br />
            Join us in transforming Africa&apos;s creative economy.
          </motion.p>
        </div>
      </Section>

      {/* Why Partner Section */}
      <Section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-transparent h-32" />

        <div className="relative z-10">
          <SectionHeader title="Why Partner With FairPlay?" align="center" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPartner.map((item, index) => (
              <motion.div key={item.title} variants={staggerItem}>
                <motion.div
                  whileHover={cardHover}
                  className={cn(
                    "h-full rounded-2xl p-6",
                    "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
                    "border border-slate-700/50 hover:border-teal-500/50",
                    "transition-all duration-300",
                  )}
                >
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 w-fit mb-4">
                    <item.icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Ideal Partners Section */}
      <Section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <SectionHeader title="Our Ideal Partners" align="center" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {idealPartners.map((partner) => (
              <motion.div key={partner.title} variants={staggerItem}>
                <Card variant="bento" className="h-full" hover glow>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20 w-fit mb-4">
                    <partner.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {partner.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* How to Partner Section */}
      <Section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-transparent h-32" />

        <div className="relative z-10">
          <SectionHeader title="How to Partner With Us" align="center" />

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {partnershipSteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="relative"
              >
                {/* Connector line */}
                {index < partnershipSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-700 to-transparent" />
                )}

                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 text-2xl font-bold text-teal-400 mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="p-4 rounded-full bg-teal-500/10 border border-teal-500/20 w-fit mx-auto mb-6">
                <Handshake className="w-8 h-8 text-teal-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Us as a Partner
              </h2>

              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Ready to help protect African creativity? Let&apos;s start a
                conversation about how we can work together.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gap-2">
                  Become a Partner
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="lg" className="gap-2">
                  <Mail className="w-5 h-5" />
                  partnerships@fairplay.africa
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
