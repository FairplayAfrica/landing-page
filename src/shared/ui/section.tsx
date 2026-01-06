'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { fadeInUp, staggerContainer, viewportConfig } from '@/shared/lib/animations';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  as?: 'section' | 'div';
  animate?: boolean;
}

export function Section({
  children,
  className,
  id,
  containerClassName,
  as = 'section',
  animate = true,
}: SectionProps) {
  const Component = animate ? motion[as] : as;

  return (
    <Component
      id={id}
      className={cn('py-20 md:py-28 lg:py-32', className)}
      {...(animate && {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: viewportConfig,
        variants: staggerContainer,
      })}
    >
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </Component>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  animate?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  animate = true,
}: SectionHeaderProps) {
  const Wrapper = animate ? motion.div : 'div';

  return (
    <Wrapper
      className={cn(
        'mb-12 md:mb-16 lg:mb-20',
        align === 'center' && 'text-center',
        className
      )}
      {...(animate && { variants: fadeInUp })}
    >
      {subtitle && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </Wrapper>
  );
}
