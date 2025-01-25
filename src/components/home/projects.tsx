'use client'; // Ensure this is a Client Component

import Link from "next/link";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Projects() {
	// Refs for each project div
	const projectRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
	const sectionRef = useRef<HTMLElement | null>(null); // Ref for the section

	useEffect(() => {
		// Set initial opacity to 0 for all project divs
		projectRefs.current.forEach((project) => {
			if (project) {
				gsap.set(project, { opacity: 0 });
			}
		});

		// Create an Intersection Observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						projectRefs.current.forEach((project, index) => {
							if (project) {
								console.log(`Animating project ${index}`); // Debugging: Log which project is being animated
								const direction = project.classList.contains('left') ? -100 : 100; // Slide from left or right

								// Animate opacity and x position
								gsap.to(project, {
									x: 0, // Move to final position
									opacity: 1, // Fade in to full opacity
									duration: 1, // Animation duration
									delay: index * 0.2, // Staggered delay
									ease: 'power3.out', // Smooth easing
								});
							}
						});

						// Stop observing after the animations are triggered
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		// Start observing the section
		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		// Cleanup the observer on unmount
		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			className="grid w-full grid-cols-3 grid-rows-[repeat(4,300px)] gap-8 p-24"
		>
			<Link
				href={''}
				ref={(el) => { projectRefs.current[0] = el; }}
				className="left group relative col-span-2 row-span-2 flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			>
				<div className="bg-noise absolute inset-0 opacity-30 transition-all duration-150 ease-out group-hover:-inset-20" />
				<div className="z-10 flex justify-end gap-2">
					<span className="rounded-xl border border-waikawa-400 bg-waikawa-400/80 px-3.5 py-2 text-sm font-semibold text-waikawa-50 backdrop-blur-sm">React.js</span>
					<span className="rounded-xl border border-waikawa-400 bg-waikawa-400/80 px-3.5 py-2 text-sm font-semibold text-waikawa-50 backdrop-blur-sm">Web Development</span>
				</div>
				<h3 className="z-10 text-4xl font-bold text-waikawa-800 transition-all duration-300 ease-out group-hover:underline">Portfolio</h3>
				<div className="absolute left-1/2 top-[12.5rem] z-10 flex -translate-x-1/2 -rotate-12 flex-col items-center gap-4 transition-all duration-300 ease-out group-hover:left-[55%] group-hover:top-[12rem]">
					<div className="flex gap-4">
						<div className="h-64 w-96 rounded-2xl bg-waikawa-300" />
						<div className="h-64 w-96 rounded-2xl bg-waikawa-300" />
						<div className="h-64 w-96 rounded-2xl bg-waikawa-300" />
					</div>
					<div className="ml-[25rem] flex gap-4">
						<div className="h-64 w-96 rounded-2xl bg-waikawa-300" />
						<div className="h-64 w-96 rounded-2xl bg-waikawa-300" />
						<div className="h-64 w-96 rounded-2xl bg-waikawa-300" />
					</div>
				</div>
			</Link>

			<div
				ref={(el) => { projectRefs.current[1] = el; }}
				className="right group relative flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			></div>

			<div
				ref={(el) => { projectRefs.current[2] = el; }}
				className="right group relative flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			></div>

			<div
				ref={(el) => { projectRefs.current[3] = el; }}
				className="left group relative flex cursor-pointer items-end overflow-hidden rounded-3xl bg-waikawa-100 bg-[url('/nathan-da-silva.jpg')] bg-center p-8"
			>
				<h4 className="z-10 text-4xl font-bold text-white">Ready to collaborate?</h4>
				<div className="absolute inset-0 bg-waikawa-900/70" />
			</div>

			<div
				ref={(el) => { projectRefs.current[4] = el; }}
				className="right group relative col-span-2 flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			></div>

			<div
				ref={(el) => { projectRefs.current[5] = el; }}
				className="left group relative flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			></div>

			<div
				ref={(el) => { projectRefs.current[6] = el; }}
				className="right group relative flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			></div>

			<div
				ref={(el) => { projectRefs.current[7] = el; }}
				className="right group relative flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl bg-waikawa-100 p-8"
			></div>
		</section>
	);
}