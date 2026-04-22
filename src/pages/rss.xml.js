import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { useTranslations, defaultLocale } from '../i18n';

export async function GET(context) {
	const t = useTranslations(defaultLocale);
	const posts = await getCollection('blog');
	return rss({
		title: t('site.title'),
		description: t('site.description'),
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
