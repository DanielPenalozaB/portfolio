import cn from '@/utils/cn';
import { TitleShapeIcon } from '../icons/title-shape';

type SectionHeadingProps = {
  title: string;
  description?: string;
  isOposite?: boolean;
};

export default function SectionHeading({ title, description, isOposite = false }: SectionHeadingProps) {
  const renderDescription = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g); // split by **emphasized**

    return parts.map((part, index) => {
      const match = part.match(/^\*\*(.*?)\*\*$/);

      if (match) {
        return (
          <span
            key={index}
            className={cn(
              'bg-gradient-to-r bg-clip-text text-transparent',
              isOposite ? 'from-violet-400 to-fuchsia-400' : 'from-violet-500 to-fuchsia-500'
            )}
          >
            {match[1]}
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <TitleShapeIcon className={cn(
          'mr-2 h-6 w-6 ',
          isOposite ? 'text-violet-400' : 'text-violet-500'
        )} />
        <h2 className={cn(
          'bg-gradient-to-r bg-clip-text text-lg font-semibold text-transparent',
          isOposite ? 'from-violet-400 to-fuchsia-400' : 'from-violet-500 to-fuchsia-500'
        )}>
          {title}
        </h2>
      </div>
      {description && (
        <p className={cn(
          'text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight sm:text-5xl',
          isOposite ? 'text-neutral-200' : 'ttext-neutral-700'
        )}>
          {renderDescription(description)}
        </p>
      )}
    </div>
  );
}
