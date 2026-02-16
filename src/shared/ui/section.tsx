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
      className={cn('py-16 md:py-20 lg:py-24', className)}
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
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  animate?: boolean;
}

export function SectionHeader({
  title,
  description,
  align = 'center',
  className,
  animate = true,
}: SectionHeaderProps) {
  const Wrapper = animate ? motion.div : 'div';

  return (
    <Wrapper
      className={cn(
        'mb-10 md:mb-12 lg:mb-16',
        align === 'center' && 'text-center',
        className
      )}
      {...(animate && { variants: fadeInUp })}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 md:mt-6 text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed',
          align === 'center' && 'mx-auto'
        )}>
          {description}
        </p>
      )}
    </Wrapper>
  );
}
