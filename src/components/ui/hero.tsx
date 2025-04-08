'use client';

import Link from 'next/link';
import Button from './button';
import { ArrowRightIcon } from '../icons/arrow-right';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Your Vision,</span>
              <span className="mt-2 block">
                My
                <span className="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                  Expertise
                </span>
              </span>
              <span className="mt-2 block">Let&apos;s Build Together</span>
            </h1>
            <p className="text-muted-foreground animation-delay-200 mt-6 text-lg opacity-0">
              Freelance full stack developer and UI/UX designer specializing in crafting beautiful, functional, and
              accessible digital experiences that drive results.
            </p>
            <div className="animation-delay-300 mt-8 flex items-center gap-4 opacity-0">
              <Button size="lg">
                <Link href="#services">
                  Explore Services <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/resume.pdf" target="_blank">
                  Download Resume <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

