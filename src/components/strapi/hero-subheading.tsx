export default function HeroSubHeading({ body }: { body: string }) {
  const highlightext = body
    .replace(/Full stack/, '<span class="font-semibold text-violet-400">Full stack</span>')
    .replace(/UX\/UI/, '<span class="font-semibold text-fuchsia-400">UX/UI</span>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  return (
    <p
      className="mt-6 max-w-xl text-center text-lg text-neutral-500"
      dangerouslySetInnerHTML={{ __html: highlightext }}
    />
  );
}
