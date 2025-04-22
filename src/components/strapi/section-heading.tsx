import { TitleShapeIcon } from '../icons/title-shape';

type SectionHeadingProps = {
  title: string;
  description?: string;
};

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  const renderDescription = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g); // split by **emphasized**

    return parts.map((part, index) => {
      const match = part.match(/^\*\*(.*?)\*\*$/);

      if (match) {
        return (
          <span
            key={index}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
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
        <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-500" />
        <h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight text-neutral-700 sm:text-5xl">
          {renderDescription(description)}
        </p>
      )}
    </div>
  );
}
