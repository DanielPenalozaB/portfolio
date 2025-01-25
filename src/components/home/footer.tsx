import Link from "next/link";

export default function Footer() {
  return (
    <footer className='w-full px-24 pt-24'>
      <div className='relative flex w-full flex-col gap-20 overflow-hidden rounded-t-3xl bg-waikawa p-20 text-3xl'>
        <div className="bg-noise absolute inset-0 opacity-5" />
        <span className="z-10 font-bold text-white">Daniel Peñaloza</span>
        <div className="z-10 flex w-full items-center justify-between">
          <Link href={'/projects'} className="font-bold text-waikawa-300 hover:text-waikawa-200">Projects</Link>
          <Link href={'/experience'} className="font-bold text-waikawa-300 hover:text-waikawa-200">Experience</Link>
          <Link href={'/services'} className="font-bold text-waikawa-300 hover:text-waikawa-200">Services</Link>
        </div>
      </div>
    </footer>
  )
}
