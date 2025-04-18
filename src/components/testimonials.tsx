'use client';

import { useState } from 'react';
import { TitleShapeIcon } from './icons/title-shape';
import { Testimonial } from '@/types/testimonial';
import QuoteMarkIcon from './icons/quote-mark';
import Button from './ui/button';
import { ChevronIcon } from './icons/chevron';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechStart Inc.',
    avatar: '/placeholder.svg?height=100&width=100',
    content:
      'Alex transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. The attention to detail and technical expertise were impressive. Our conversion rate has increased by 40% since the redesign!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Product Manager',
    company: 'FinEdge',
    avatar: '/placeholder.svg?height=100&width=100',
    content:
      'Working with Alex on our fintech app was a game-changer. The UI/UX improvements and performance optimizations made a significant impact on user engagement. The project was delivered on time and exceeded our expectations.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Marketing Director',
    company: 'GrowthLabs',
    avatar: '/placeholder.svg?height=100&width=100',
    content:
      'Alex\'s ability to translate our vision into a functional, beautiful website was remarkable. The process was collaborative and transparent from start to finish. I especially appreciated the attention to SEO and performance optimization.'
  },
  {
    id: 4,
    name: 'David Park',
    position: 'Founder',
    company: 'HealthTech Solutions',
    avatar: '/placeholder.svg?height=100&width=100',
    content:
      'We hired Alex to develop our healthcare platform\'s frontend, and the results were outstanding. The interface is intuitive, accessible, and performs flawlessly. Alex\'s technical knowledge and problem-solving skills made complex challenges seem simple.",  Alex\'s technical knowledge and problem-solving skills made complex challenges seem simple.'
  }
];

export default function Testimonials() {
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <div className="flex items-center">
        <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-500" />
        <h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">Happy Clients, Great Work</h2>
      </div>
      <p className="text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight text-neutral-700 sm:text-5xl">
        What others{' '}
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          say.
        </span>
      </p>
      <div className="mx-auto mt-10 max-w-4xl sm:mt-16">
        <div
          className="relative overflow-hidden"
        >
          <div className="flex items-center justify-center">
            <div className="w-full rounded-xl border-4 border-neutral-200 p-6">
              <div className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-light text-violet-600">{testimonials[currentIndex].name}</h3>
                    <p className="text-sm font-light text-neutral-400">
                      {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
                <QuoteMarkIcon className="h-8 w-8 text-violet-600" />
              </div>
              <div className="pt-4">
                <p className="text-lg font-light text-neutral-500">{testimonials[currentIndex].content}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  index === currentIndex ? 'w-8 bg-violet-500' : 'w-2 bg-neutral-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-2! rounded-full! border-neutral-300! hover:bg-neutral-300!"
            >
              <ChevronIcon className="h-4 w-4 -rotate-90" />
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-2! rounded-full! border-neutral-300! hover:bg-neutral-300! rotate-90"
            >
              <ChevronIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}