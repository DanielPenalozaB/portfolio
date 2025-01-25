"use client";

import { MoonIcon, SunIcon } from "@/assets/svg";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
	const t = useTranslations('nav.theme');

	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	if (resolvedTheme === "dark") {

		return (
			<button
				onClick={() => setTheme("light")}
				type="button"
				title={t('light')}
				className="rounded-full focus:outline-none focus:ring-2 focus:ring-light focus:ring-offset-2"
			>
				<SunIcon className="h-6 w-6 fill-inherit" />
			</button>
		);
	} else {
		return (
			<button
				onClick={() => setTheme("dark")}
				type="button"
				title={t('dark')}
				className="rounded-full focus:outline-none focus:ring-2 focus:ring-dark focus:ring-offset-2"
			>
				<MoonIcon className="h-6 w-6 fill-inherit" />
			</button>
		);
	}
};