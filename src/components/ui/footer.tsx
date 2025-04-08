import Link from 'next/link';
import { GithubIcon } from '../icons/github';
import { LinkedInIcon } from '../icons/linkedin';
import { EnvelopeIcon } from '../icons/envelope';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center border-t border-neutral-200 bg-neutral-100">
      <div className="container px-8 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="text-xl font-light tracking-wider">
              Daniel Pe&ntilde;aloza
            </Link>
            <p className="text-center text-sm font-light text-neutral-500 md:text-left">
              Full Stack & UX/UI Developer
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-4">
              <Link
                href="https://github.com/DanielPenalozaB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-violet-400"
                aria-label="GitHub"
                title='GitHub'
              >
                <GithubIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/juan-daniel-pe%C3%B1aloza-brito-85b740251/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-violet-400"
                aria-label="LinkedIn"
                title='LinkedIn'
              >
                <LinkedInIcon className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:juandanielpenalozabrito@gmail.com"
                className="text-neutral-500 transition-colors hover:text-violet-400"
                aria-label="Email"
                title='Email'
              >
                <EnvelopeIcon className="h-5 w-5 stroke-2" />
              </Link>
            </div>
            <p className="text-sm font-light text-neutral-500">© {currentYear} Daniel Pe&ntilde;aloza. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

