'use client';

import cn from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon } from '../icons/bars3';
import { SunIcon } from '../icons/sun';
import { XMarkIcon } from '../icons/xmark';
import Button from './button';

export default function Navbar() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (isMenuOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header
        className={cn(
          'sticky flex justify-center top-0 z-50 w-full transition-all duration-200 ease-out border-b',
          isMenuOpen ? 'bg-neutral-50/60 backdrop-blur-sm' : 'bg-transparent'
        )}
      >
        <div className="container flex h-20 w-full items-center justify-between px-8 transition-all duration-200 ease-in-out">
          <Link href="/" className="text-xl font-bold tracking-tighter transition-colors hover:text-neutral-800">
            Daniel Pe&ntilde;aloza
          </Link>
          <div className="block md:hidden">
            <div className="flex items-center gap-2">
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  title={item.name}
<<<<<<< HEAD
<<<<<<< HEAD
                  className="flex items-center justify-center p-2 font-medium text-neutral-500 transition-colors hover:text-purple-400"
=======
                  className="hover:text-primary flex items-center justify-center p-2 font-medium text-neutral-500 transition-colors hover:text-purple-400"
>>>>>>> 0386ff9 (POR-3 (feat): Create footer)
=======
                  className="flex items-center justify-center p-2 font-medium text-neutral-500 transition-colors hover:text-purple-400"
>>>>>>> 823dd68 (POR-3 (refactor): Remove unused class)
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <Button
              variant="text"
              className='!p-2.5'
              title='Toggle dark mode'
            >
              <SunIcon className="size-5" />
            </Button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 bottom-0 left-0 right-0 top-20 z-40 bg-neutral-50/60 backdrop-blur-sm md:hidden">
          <div className="container flex h-full flex-col px-8 py-6">
            <nav className="my-8 flex flex-col items-center justify-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  title={item.name}
<<<<<<< HEAD
<<<<<<< HEAD
                  className="flex items-center justify-center p-2 text-lg font-medium text-neutral-500 transition-colors hover:text-purple-400"
=======
                  className="hover:text-primary flex items-center justify-center p-2 text-lg font-medium text-neutral-500 transition-colors hover:text-purple-400"
>>>>>>> 0386ff9 (POR-3 (feat): Create footer)
=======
                  className="flex items-center justify-center p-2 text-lg font-medium text-neutral-500 transition-colors hover:text-purple-400"
>>>>>>> 823dd68 (POR-3 (refactor): Remove unused class)
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.body.style.overflow = 'auto';
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}