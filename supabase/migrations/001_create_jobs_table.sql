-- ============================================
-- FairPlay Africa - Jobs Table Migration
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create the jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  team TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  level TEXT NOT NULL CHECK (level IN ('Junior', 'Mid-level', 'Senior', 'Lead', 'Manager')),
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create an index for common queries
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs (is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_team ON public.jobs (team);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs (created_at DESC);

-- 3. Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_jobs_updated_at ON public.jobs;
CREATE TRIGGER set_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Public: anyone can read active jobs
CREATE POLICY "Anyone can view active jobs"
  ON public.jobs
  FOR SELECT
  USING (is_active = true);

-- Anon/Service: allow all operations for admin (using anon key for now)
-- In production, replace with proper auth-based policies
CREATE POLICY "Admin can do everything"
  ON public.jobs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 6. Enable Realtime for the jobs table
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;

-- 7. Seed data
INSERT INTO public.jobs (title, team, location, type, level, description, requirements, responsibilities, is_active)
VALUES
(
  'Senior Backend Engineer',
  'Engineering',
  'Lagos, Nigeria',
  'Full-time',
  'Senior',
  'We are looking for a Senior Backend Engineer to help build and scale our content fingerprinting and piracy detection infrastructure. You will design and implement high-throughput APIs and data pipelines that power our platform.',
  ARRAY['5+ years of backend development experience', 'Proficiency in Node.js/TypeScript or Python', 'Experience with distributed systems and microservices', 'Strong understanding of databases (SQL & NoSQL)', 'Experience with cloud platforms (AWS/GCP)'],
  ARRAY['Design and implement scalable APIs and services', 'Build and maintain data pipelines for content fingerprinting', 'Collaborate with product and data teams on new features', 'Mentor junior engineers and review code', 'Participate in on-call rotations'],
  true
),
(
  'Frontend Engineer',
  'Engineering',
  'Remote, Africa',
  'Full-time',
  'Mid-level',
  'Join our frontend team to build beautiful, performant user interfaces for our dashboard and content protection tools. You will work closely with designers and product managers to ship delightful experiences.',
  ARRAY['3+ years of frontend development experience', 'Strong proficiency in React and TypeScript', 'Experience with Next.js or similar frameworks', 'Understanding of web performance and accessibility', 'Eye for design and attention to detail'],
  ARRAY['Develop and maintain the FairPlay dashboard', 'Build reusable UI components and design systems', 'Optimize application performance and accessibility', 'Work closely with designers to implement pixel-perfect UIs', 'Write comprehensive tests for frontend components'],
  true
),
(
  'Data Scientist',
  'Data Science',
  'Remote, Global',
  'Full-time',
  'Mid-level',
  'We need a Data Scientist to develop and improve our piracy detection algorithms. You will work with large datasets of audio/video fingerprints and help us stay ahead of content pirates across the continent.',
  ARRAY['3+ years of experience in data science or ML engineering', 'Strong Python skills with experience in ML frameworks', 'Experience with audio/video processing is a plus', 'Solid understanding of statistics and ML fundamentals', 'Experience with big data tools (Spark, etc.)'],
  ARRAY['Develop and improve content matching algorithms', 'Build ML models for piracy detection and prediction', 'Analyze patterns in piracy data across African markets', 'Collaborate with engineering to deploy models to production', 'Present findings to stakeholders and leadership'],
  true
),
(
  'Product Designer',
  'Design',
  'Lagos, Nigeria',
  'Full-time',
  'Mid-level',
  'We are looking for a Product Designer to shape the user experience of our platform. You will design intuitive workflows for filmmakers and content creators to protect and monetize their work.',
  ARRAY['3+ years of product design experience', 'Strong portfolio demonstrating UX/UI skills', 'Proficiency in Figma or similar design tools', 'Experience with design systems', 'Understanding of user research methodologies'],
  ARRAY['Design end-to-end user flows for the FairPlay platform', 'Conduct user research and usability testing', 'Maintain and evolve the design system', 'Collaborate with engineers to ship high-quality products', 'Create prototypes for new product concepts'],
  true
),
(
  'Business Development Manager',
  'Marketing & Sales',
  'Nairobi, Kenya',
  'Full-time',
  'Senior',
  'Drive partnerships and market expansion across East Africa. You will build relationships with studios, distributors, and streaming platforms to grow FairPlay''s presence in the region.',
  ARRAY['5+ years of business development experience', 'Deep knowledge of the African media & entertainment industry', 'Strong network in the East African entertainment sector', 'Excellent communication and presentation skills', 'Experience with B2B sales cycles'],
  ARRAY['Identify and close partnership deals across East Africa', 'Build and manage relationships with key stakeholders', 'Develop go-to-market strategies for new regions', 'Represent FairPlay at industry events and conferences', 'Collaborate with product team on market-specific needs'],
  true
),
(
  'Legal & Compliance Analyst',
  'Legal & Compliance',
  'Accra, Ghana',
  'Full-time',
  'Mid-level',
  'Support our legal and compliance operations across multiple African jurisdictions. You will help navigate copyright law, data protection regulations, and content licensing frameworks.',
  ARRAY['Law degree or equivalent qualification', '2+ years of experience in IP law, media law, or compliance', 'Familiarity with copyright laws across African countries', 'Understanding of data protection regulations (GDPR, POPIA, etc.)', 'Excellent analytical and writing skills'],
  ARRAY['Review and draft partnership and licensing agreements', 'Monitor regulatory developments across African markets', 'Advise product teams on legal and compliance requirements', 'Support takedown processes and enforcement actions', 'Develop compliance training materials for the team'],
  true
),
(
  'DevOps Engineer',
  'Engineering',
  'Remote, Africa',
  'Full-time',
  'Senior',
  'Build and maintain the infrastructure that powers FairPlay''s platform. You will work on CI/CD pipelines, container orchestration, monitoring, and security to ensure high availability and reliability.',
  ARRAY['5+ years of DevOps or SRE experience', 'Strong experience with Kubernetes and Docker', 'Proficiency with cloud platforms (AWS/GCP/Azure)', 'Experience with IaC tools (Terraform, Pulumi)', 'Strong understanding of security best practices'],
  ARRAY['Design and manage cloud infrastructure', 'Build and maintain CI/CD pipelines', 'Implement monitoring, alerting, and incident response', 'Optimize infrastructure costs and performance', 'Ensure security and compliance of all systems'],
  true
);
