import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import cn from '@/utils/cn';
import ProjectCard from './project-card';

export default function ProjectsList({ data, locale }: { data: DynamicZone | undefined, locale: string }) {
  if (!data) {
    return null;
  }

  const { heading, projects } = data;

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <p className={cn('text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight sm:text-5xl text-neutral-700')}>
        {heading.title}
      </p>
      <div className="mt-10 grid w-full max-w-6xl grid-rows-3 gap-6 sm:mt-16 lg:grid-cols-12">
        {projects && projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
