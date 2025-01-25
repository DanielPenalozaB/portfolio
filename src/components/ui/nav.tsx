'use client';

import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';
import LangSwitcher from './lang-switcher';
import { useTranslations } from 'next-intl';
import Button from './button';

export default function Nav() {
	const t = useTranslations('nav');

	return (
		<nav className="z-20 flex w-full items-center justify-between px-24 py-10 text-neutral-800 dark:text-neutral-200">
			<div className="flex items-center gap-10">
				<span className='font-courier-prime'>Daniel Pe&ntilde;aloza</span>
				<div className="flex items-center gap-4">
					<Link href='/'>
						{t('home')}
					</Link>
					<Link href='/projects'>
						{t('projects')}
					</Link>
					<Link href='/services'>
						{t('services')}
					</Link>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<ThemeSwitcher />
				<LangSwitcher />
				<div className='h-6 w-px bg-neutral-400 dark:bg-neutral-400' />
				<Button variant='outline' isDisabled={false}>
					{t('downloadCV')}
				</Button>
			</div>
		</nav>
	)
}
