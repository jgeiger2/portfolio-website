'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mockup } from "@/components/ui/mockup"
import { Glow } from "@/components/ui/glow"
import { Github } from "lucide-react";

interface HeroWithMockupProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <Github className="mr-2 h-4 w-4" />,
  },
  mockupImage,
  className,
}: HeroWithMockupProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-100 via-background-light to-secondary-100 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{title}</span>{' '}
                <span className="block text-primary-600 dark:text-primary-500 xl:inline">{description}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {description}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "bg-gradient-to-b from-brand to-brand/90 dark:from-brand/90 dark:to-brand/80",
                      "hover:from-brand/95 hover:to-brand/85 dark:hover:from-brand/80 dark:hover:to-brand/70",
                      "text-white shadow-lg",
                      "transition-all duration-300",
                    )}
                  >
                    <a href={primaryCta.href}>{primaryCta.text}</a>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className={cn(
                      "text-foreground/80 dark:text-foreground/70",
                      "transition-all duration-300",
                    )}
                  >
                    <a href={secondaryCta.href}>
                      {secondaryCta.icon}
                      {secondaryCta.text}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 sm:h-72 md:h-96 lg:h-full">
          <Image
            src={mockupImage.src}
            alt={mockupImage.alt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}
