'use client';

import { useState } from 'react';
import QuoteMarkIcon from './icons/quote-mark';
import Button from './ui/button';
import { ChevronIcon } from './icons/chevron';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SectionHeading from './strapi/section-heading';

export default function Testimonials({ data }: { data: DynamicZone | undefined }) {
  const [ currentIndex, setCurrentIndex ] = useState(0);

  if (!data) {
    return null;
  }

  const { heading, clients } = data;

  if (!clients) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? clients.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === clients.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <SectionHeading
        title={heading?.title || 'Testimonials'}
        description={heading?.description?.body}
      />
      <div className="mx-auto mt-10 max-w-4xl sm:mt-16">
        <div
          className="relative overflow-hidden"
        >
          {clients.length > 0 && (
            <>
              <div className="flex items-center justify-center">
                <div className="w-full rounded-xl border-4 border-neutral-200 p-6">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-light text-violet-600">{clients[currentIndex].name}</h3>
                        <p className="text-sm font-light text-neutral-400">
                          {clients[currentIndex].jobTitle}, {clients[currentIndex].company && clients[currentIndex].company.name}
                        </p>
                      </div>
                    </div>
                    <QuoteMarkIcon className="h-8 w-8 text-violet-600" />
                  </div>
                  <div className="pt-4">
                    <p className="text-neutral-500">{clients[currentIndex].testimonial}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2">
                {clients.map((_, index) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}