"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/shared/ui/section";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/shared/lib/animations";

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <Section className="bg-slate-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy & Data
            </h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="space-y-12">
              {/* Privacy Policy */}
              <section id="privacy">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Privacy Policy
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    FairPlay Africa (&quot;we,&quot; &quot;our,&quot; or
                    &quot;us&quot;) is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose,
                    and safeguard your information when you use our website and
                    services.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Information We Collect
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account information (name, email, organization)</li>
                    <li>Content metadata for fingerprinting purposes</li>
                    <li>Usage data and analytics</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    How We Use Your Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our content protection services</li>
                    <li>Process and monitor for content infringement</li>
                    <li>Send notifications and reports</li>
                    <li>Communicate about service updates</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Data Security
                  </h3>
                  <p>
                    We implement appropriate security measures to protect your
                    personal information and content data. However, no method of
                    transmission over the internet is 100% secure.
                  </p>
                </div>
              </section>

              {/* Terms of Use */}
              <section id="terms" className="pt-8 border-t border-slate-800">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Terms of Use
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    By accessing and using FairPlay Africa&apos;s services, you
                    agree to be bound by these Terms of Use.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Acceptable Use
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      You must own or have rights to the content you upload
                    </li>
                    <li>You may not use our services for illegal purposes</li>
                    <li>You agree to provide accurate account information</li>
                    <li>
                      You are responsible for maintaining account security
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Service Limitations
                  </h3>
                  <p>
                    FairPlay Africa provides content monitoring and detection
                    services on a best-effort basis. We cannot guarantee
                    detection of all unauthorized content distribution.
                  </p>
                </div>
              </section>

              {/* Refund Policy */}
              <section id="refund" className="pt-8 border-t border-slate-800">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Refund Policy
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We want you to be satisfied with our services. Here&apos;s
                    our refund policy:
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Subscription Cancellation
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cancel anytime from your account dashboard</li>
                    <li>
                      Access continues until the end of your billing period
                    </li>
                    <li>No partial refunds for unused time</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Refund Requests
                  </h3>
                  <p>
                    If you&apos;re unsatisfied within the first 14 days of your
                    subscription, contact our support team for a full refund.
                    After 14 days, refunds are evaluated on a case-by-case
                    basis.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    Contact Us
                  </h3>
                  <p>
                    For refund requests or questions about our policies, email
                    us at{" "}
                    <a
                      href="mailto:support@fairplay.africa"
                      className="text-teal-400 hover:text-teal-300"
                    >
                      support@fairplay.africa
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
