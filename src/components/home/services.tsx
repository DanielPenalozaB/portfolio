import { ChevronDownIcon } from "@/assets/svg";

export default function Services() {
  return (
    <section className="p-24">
      <div className="relative flex items-center justify-center gap-24 overflow-hidden rounded-3xl bg-gradient-to-tr from-[#9CB6DD] from-20% to-[#6374AE] to-70% p-20">
        <div className="bg-noise absolute inset-0 opacity-30" />
        <div className="z-10 flex w-full flex-col gap-12">
          <div className="flex w-full gap-6">
            <div className="h-auto min-w-1.5 rounded-full bg-waikawa-50" />
            <div className="flex w-full flex-col gap-4 text-waikawa-50">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-4xl font-semibold">Web development</h3>
                <ChevronDownIcon className="h-8 w-8" />
              </div>
              <p>
                Crafting fast, responsive, and user-friendly websites tailored to your brand. From sleek designs to powerful functionality, I bring your online vision to life.
              </p>
            </div>
          </div>
          <div className="flex w-full gap-6">
            <div className="h-auto min-w-1.5 rounded-full bg-waikawa-50" />
            <div className="flex w-full flex-col gap-4 text-waikawa-50">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-4xl font-semibold">Mobile app development</h3>
                <ChevronDownIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-6">
            <div className="h-auto min-w-1.5 rounded-full bg-waikawa-50" />
            <div className="flex w-full flex-col gap-4 text-waikawa-50">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-4xl font-semibold">Consulting</h3>
                <ChevronDownIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-6">
            <div className="h-auto min-w-1.5 rounded-full bg-waikawa-50" />
            <div className="flex w-full flex-col gap-4 text-waikawa-50">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-4xl font-semibold">Design</h3>
                <ChevronDownIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 flex h-full w-full flex-col gap-6">
          <div className="flex h-96 gap-12 rounded-xl bg-[#E7F0F8]/20 p-12">
            <div className="min-h-full flex-1 rounded-xl bg-[#B9CFE8]/70" />
            <div className="flex h-full flex-1 flex-col gap-12">
              <div className="min-h-[calc(50%_-_24px)] flex-1 rounded-xl bg-waikawa-300" />
              <div className="min-h-[calc(50%_-_24px)] flex-1 rounded-xl bg-waikawa-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}