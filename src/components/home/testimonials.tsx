export default function Testimonials() {
  return (
    <section className='w-full p-24'>
      <div className='relative flex w-full flex-col gap-20 overflow-hidden rounded-3xl bg-waikawa-950 py-20'>
        <div className="bg-noise absolute inset-0 opacity-5" />
        <h3 className='z-10 pl-20 text-4xl font-bold text-white'>Out customers</h3>
        <div className="no-scrollbar z-10 flex snap-x gap-8 overflow-x-auto px-8">
          <div className="flex min-w-[650px] snap-center flex-col gap-8">
            <div className="flex rounded-2xl bg-waikawa-900/50 p-6 text-2xl text-waikawa-300 backdrop-blur-sm">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod turpis est, eget pulvinar neque convallis in. Nullam fringilla dignissim nulla ac consequat. Aliquam volutpat, mauris non ornare tristique, tortor orci condimentum purus, non posuere sem libero gravida nisi.</p>
            </div>
            <div className="flex w-full gap-8">
              <div className="h-16 w-16 rounded-full bg-waikawa-900" />
              <div className="flex flex-col justify-center gap-2">
                <span className="text-2xl font-bold text-waikawa-300">Humpty Alexander Dumpty</span>
                <span className="text-waikawa-900">CEO, Far Far Away.</span>
              </div>
            </div>
          </div>
          <div className="flex min-w-[650px] snap-center flex-col gap-8">
            <div className="flex rounded-2xl bg-waikawa p-6 text-2xl text-waikawa-100">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod turpis est, eget pulvinar neque convallis in. Nullam fringilla dignissim nulla ac consequat. Aliquam volutpat, mauris non ornare tristique, tortor orci condimentum purus, non posuere sem libero gravida nisi.</p>
            </div>
            <div className="flex w-full gap-8">
              <div className="h-16 w-16 rounded-full bg-waikawa" />
              <div className="flex flex-col justify-center gap-2">
                <span className="text-2xl font-bold text-white">Humpty Alexander Dumpty</span>
                <span className="text-waikawa">CEO, Far Far Away.</span>
              </div>
            </div>
          </div>
          <div className="flex min-w-[650px] snap-center flex-col gap-8">
            <div className="flex rounded-2xl bg-waikawa-900 p-6 text-2xl text-waikawa-300">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod turpis est, eget pulvinar neque convallis in. Nullam fringilla dignissim nulla ac consequat. Aliquam volutpat, mauris non ornare tristique, tortor orci condimentum purus, non posuere sem libero gravida nisi.</p>
            </div>
            <div className="flex w-full gap-8">
              <div className="h-16 w-16 rounded-full bg-waikawa-900" />
              <div className="flex flex-col justify-center gap-2">
                <span className="text-2xl font-bold text-waikawa-300">Humpty Alexander Dumpty</span>
                <span className="text-waikawa-900">CEO, Far Far Away.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
