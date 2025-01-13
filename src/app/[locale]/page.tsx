import Nav from "@/components/nav";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageParams = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageParams) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'home.metadata' });

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		og: {
			title: t('openGraph.title'),
			description: t('openGraph.description'),
			siteName: t('openGraph.siteName'),
			type: t('openGraph.type'),
		},
	};
}

export default async function Home({ params }: PageParams) {
	const { locale } = await params;

	setRequestLocale(locale);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Nav />
		</div>
	);
}