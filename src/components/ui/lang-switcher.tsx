'use client';

import { ChevronUpDownIcon, GlobeAltIcon } from '@/assets/svg';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Button from './button';
import { useId } from 'react';
import useToggle from '@/hooks/useToggle';
import useOutsideClick from '@/hooks/useOutsideClick';
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';

type Language = {
	code: string;
	label: string;
	abbreviation: string;
};

const languages: Language[] = [
	{ code: 'en', label: 'English', abbreviation: 'EN' },
	{ code: 'es', label: 'Español', abbreviation: 'ES' },
];

export default function LangSwitcher() {
	const t = useTranslations('nav.lang');

	const locale = useLocale();
	const router = useRouter();
	const [isOpen, { toggle, setFalse }] = useToggle(false);
	const dropdownId = useId();
	const labelId = useId();

	const dropdownRef = useOutsideClick<HTMLDivElement>({
		onOutsideClick: setFalse,
		enabled: isOpen
	});

	const handleLanguageChange = (newLocale: string) => {
		const currentPath = window.location.pathname;
		const pathWithoutLocale = currentPath.replace(/^\/[a-zA-Z-]{2,5}(?=\/|$)/, '');
		const newPath = `/${newLocale}${pathWithoutLocale}`;
		router.push(newPath);
		setFalse();
	};

	const currentLanguage = languages.find(lang => lang.code === locale);

	const { focusedIndex, menuRef } = useKeyboardNavigation({
		items: languages,
		isOpen,
		onSelect: (language) => handleLanguageChange(language.code),
		onClose: setFalse
	});

	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				variant="shades"
				onClick={toggle}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-controls={dropdownId}
				aria-labelledby={labelId}
				className="flex w-full items-center gap-2 bg-light px-4 py-2 !text-neutral-800 hover:bg-neutral-200 focus:ring-2 focus:ring-dark dark:bg-dark dark:!text-neutral-200 dark:hover:bg-neutral-900 dark:focus:ring-light"
			>
				<GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
				<span id={labelId} className="sr-only">{t('selectedLanguage')}</span>
				<span>{currentLanguage?.abbreviation}</span>
				<ChevronUpDownIcon
					className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					aria-hidden="true"
				/>
			</Button>
			<div className={`absolute w-full transform transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 translate-y-1' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
				<ul
					id={dropdownId}
					ref={menuRef}
					role="listbox"
					aria-label={t('selectLanguage')}
					aria-activedescendant={focusedIndex >= 0 ? `language-option-${languages[focusedIndex].code}` : undefined}
					className="flex w-fit flex-col gap-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
				>
					{languages.map((language, index) => (
						<LanguageOption
							key={language.code}
							language={language}
							isSelected={locale === language.code}
							isFocused={index === focusedIndex}
							onSelect={handleLanguageChange}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

type LanguageOptionProps = {
	language: Language;
	isSelected: boolean;
	isFocused: boolean;
	onSelect: (code: string) => void;
};

function LanguageOption({ language, isSelected, isFocused, onSelect }: LanguageOptionProps) {
	return (
		<li
			id={`language-option-${language.code}`}
			role="option"
			aria-selected={isSelected}
			className={`transition-colors duration-150 rounded-lg ${isSelected ? 'bg-waikawa-200 dark:bg-waikawa-900 text-gray-900 dark:text-white' : 'text-neutral-500'} ${isFocused ? '!bg-neutral-200 text-neutral-200 dark:!bg-neutral-800 dark:text-neutral-400' : 'hover:!bg-neutral-200 hover:text-neutral-600 hover:dark:!bg-neutral-800 hover:dark:text-neutral-400'}`}
		>
			<button
				onClick={() => onSelect(language.code)}
				className="flex w-full items-center justify-between gap-2 px-4 py-2 pr-2 text-left"
				title={language.label}
			>
				<span>{language.label}</span>
				<span className="text-sm text-neutral-500">{language.abbreviation}</span>
			</button>
		</li>
	);
}