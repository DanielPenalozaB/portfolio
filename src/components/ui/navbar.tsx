'use client';

import { Navbar as NavbarType } from '@/types/strapi/shared/navbar';
import cn from '@/utils/cn';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bars3Icon } from '../icons/bars3';
import { SunIcon } from '../icons/sun';
import { XMarkIcon } from '../icons/xmark';
import Button from './button';
import LanguageSwitcher from './language-switcher';

interface NavbarProps {
  data: NavbarType;
}

export default function Navbar({ data }: NavbarProps) {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ isScrolled, setIsScrolled ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (isMenuOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 flex w-full justify-center transition-all duration-200 ease-out',
          isScrolled && 'bg-neutral-50/60 backdrop-blur-md'
        )}
      >
        <div className="container flex h-20 w-full items-center justify-between px-3 transition-all duration-200 ease-in-out sm:px-8">
          <Button
            variant='link'
            href="/"
            className="!tracking-tighter! !hover:text-violet-400 !text-xl !font-bold !text-neutral-600 !transition-colors max-sm:px-2.5"
          >
            {data.logoText}
          </Button>
          <div className="block md:hidden">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="text"
                className='!p-2.5'
                title='Toggle dark mode'
              >
                <SunIcon className="size-5" />
              </Button>
              <Button
                variant="text"
                onClick={toggleMenu}
                className='!p-2.5'
                title={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
              </Button>
            </div>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex gap-6">
              {data.menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  target={item.isExternal ? '_blank' : '_self'}
                  className="flex items-center justify-center p-2 font-medium text-neutral-600 transition-colors hover:text-violet-500"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="text"
                className='!p-2.5'
                title='Toggle dark mode'
              >
                <SunIcon className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className={cn(
          'fixed inset-0 bottom-0 left-0 right-0 top-20 z-40 md:hidden',
          isScrolled ? 'bg-neutral-50/60 backdrop-blur-md' : 'backdrop-blur-lg'
        )}>
          <div className="container mx-auto flex h-full flex-col px-8 py-6">
            <nav className="my-8 flex flex-col items-center justify-center gap-4">
              {data.menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  target={item.isExternal ? '_blank' : '_self'}
                  className="flex items-center justify-center p-2 text-lg font-medium text-neutral-600 transition-colors hover:text-violet-400"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.body.style.overflow = 'auto';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}