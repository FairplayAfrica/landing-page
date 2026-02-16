"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  MessageSquare,
  Building,
  Newspaper,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Section, SectionHeader } from "@/shared/ui/section";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { staggerItem, fadeInUp } from "@/shared/lib/animations";

const contactTypes = [
  {
    icon: MessageSquare,
    title: "General Inquiries",
    email: "hello@fairplay.africa",
    description: "Questions about FairPlay Africa or our services",
  },
  {
    icon: Building,
    title: "Partnership Inquiries",
    email: "partnerships@fairplay.africa",
    description: "Interested in partnering with us",
  },
  {
    icon: Newspaper,
    title: "Media & Press",
    email: "press@fairplay.africa",
    description: "Press inquiries and media requests",
  },
];

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-slate-950 pt-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div variants={fadeInUp}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Contact Us
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 leading-relaxed"
          >
            Have questions or want to learn more?
            <br />
            We&apos;d love to hear from you.
          </motion.p>
        </div>
      </Section>

      {/* Contact Content */}
      <Section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-transparent h-32" />

        <div className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card variant="bento" className="p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Send us a message
                    </h2>
                    <p className="text-gray-400 mb-8">
                      Fill out the form below and we&apos;ll get back to you as
                      soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input label="First Name" placeholder="John" required />
                        <Input label="Last Name" placeholder="Doe" required />
                      </div>

                      <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />

                      <Input
                        label="Subject"
                        placeholder="How can we help?"
                        required
                      />

                      <Textarea
                        label="Message"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />

                      <div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-900"
                          />
                          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            I agree to receive occasional updates about FairPlay
                            Africa. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Thanks for reaching out. We&apos;ll get back to you soon.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Other ways to reach us
                </h2>
                <p className="text-gray-400">
                  Choose the best channel for your inquiry.
                </p>
              </div>

              <div className="space-y-4">
                {contactTypes.map((contact) => (
                  <motion.a
                    key={contact.title}
                    href={`mailto:${contact.email}`}
                    whileHover={{ x: 4 }}
                    className="block"
                  >
                    <Card
                      variant="glass"
                      className="group hover:border-teal-500/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 group-hover:bg-teal-500/20 transition-colors">
                          <contact.icon className="w-5 h-5 text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">
                            {contact.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">
                            {contact.description}
                          </p>
                          <p className="text-teal-400 text-sm font-medium group-hover:text-teal-300 transition-colors flex items-center gap-2">
                            {contact.email}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>

              {/* Response Time */}
              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-teal-400" />
                  Response Time
                </h4>
                <p className="text-sm text-gray-400">
                  We typically respond within 24-48 hours during business days.
                  For urgent inquiries, please mention it in your subject line.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
