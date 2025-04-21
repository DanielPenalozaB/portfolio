'use client';

import { useLocaleChange } from '@/i18n/language-handler';
import { useLanguageStore } from '@/i18n/store';
import Button from './button';

export default function LanguageSwitcher() {
  const { currentLocale } = useLanguageStore();
  const { changeLocale } = useLocaleChange();

  return (
    <Button
      variant="text"
      className='!p-2.5 text-violet-600'
      title={`Switch to ${currentLocale === 'es' ? 'English' : 'Spanish'}`}
      onClick={() => changeLocale(currentLocale === 'es' ? 'en' : 'es')}
    >
      {currentLocale === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
    </Button>
  );
}