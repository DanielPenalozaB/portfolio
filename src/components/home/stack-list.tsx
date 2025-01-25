import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function StackList() {
  const fullstackRef = useRef<HTMLSpanElement>(null); // Add type annotation
  const frontendRef = useRef<HTMLSpanElement>(null); // Add type annotation
  const backendRef = useRef<HTMLSpanElement>(null); // Add type annotation
  const containerRef = useRef<HTMLSpanElement>(null); // Add type annotation
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Ensure refs are not null before accessing their properties
    if (fullstackRef.current && frontendRef.current && backendRef.current) {
      // Measure the width and height of the widest/tallest word
      const fullstackWidth = fullstackRef.current.offsetWidth;
      const frontendWidth = frontendRef.current.offsetWidth;
      const backendWidth = backendRef.current.offsetWidth;

      const fullstackHeight = fullstackRef.current.offsetHeight;
      const frontendHeight = frontendRef.current.offsetHeight;
      const backendHeight = backendRef.current.offsetHeight;

      // Set container size to fit the largest word
      const maxWidth = Math.max(fullstackWidth, frontendWidth, backendWidth);
      const maxHeight = Math.max(fullstackHeight, frontendHeight, backendHeight);

      setContainerSize({ width: maxWidth, height: maxHeight - 8 });
    }
  }, []);

  useEffect(() => {
    // Ensure refs are not null before animating
    if (fullstackRef.current && frontendRef.current && backendRef.current) {
      const tl = gsap.timeline({ repeat: -1 }); // Infinite loop

      // Initial state: Hide all elements
      gsap.set([fullstackRef.current, frontendRef.current, backendRef.current], {
        opacity: 0,
        y: 20, // Slightly below their final position
        position: 'absolute', // Position all words in the same spot
      });

      // Animation for Fullstack
      tl.to(fullstackRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
        // Hold Fullstack for 1 second
        .to(fullstackRef.current, {
          opacity: 1,
          duration: 1,
        })
        // Fade out Fullstack
        .to(fullstackRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
        })
        // Animation for Frontend
        .to(frontendRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        // Hold Frontend for 1 second
        .to(frontendRef.current, {
          opacity: 1,
          duration: 1,
        })
        // Fade out Frontend
        .to(frontendRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
        })
        // Animation for Backend
        .to(backendRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        // Hold Backend for 1 second
        .to(backendRef.current, {
          opacity: 1,
          duration: 1,
        })
        // Fade out Backend
        .to(backendRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
        });
    }
  }, []);

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      style={{ width: containerSize.width, height: containerSize.height }}
    >
      <span ref={fullstackRef} className="absolute left-0 top-0 text-waikawa">
        Fullstack
      </span>
      <span ref={frontendRef} className="absolute left-0 top-0 text-yellow-500">
        Frontend
      </span>
      <span ref={backendRef} className="absolute left-0 top-0 text-rose-500">
        Backend
      </span>
    </span>
  );
}