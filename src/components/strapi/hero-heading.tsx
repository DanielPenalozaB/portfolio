import { DonutDoodle } from '../icons/donut-doodle';

export default function HeroHeading({ body }: { body: string }) {
  const [ first, second, third ] = body.split('\n');

  return (
    <h1 className="text-center text-4xl font-semibold tracking-tight text-neutral-800 sm:text-5xl md:text-6xl">
      <span className="block italic">
        <DonutDoodle className="mb-2 mr-2 inline-block h-7 w-7 text-violet-500 sm:h-8 sm:w-8 md:h-10 md:w-10" />
        {first}
      </span>
      <span className="mt-2 block">
        {second && second.split(' ')[0]}{' '}
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          {second && second.split(' ')[1]}
        </span>
      </span>
      <span className="mt-2 block">{third}</span>
    </h1>
  );
}
