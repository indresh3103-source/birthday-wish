import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WalkingCharacter() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.character', { x: '-35vw' }, { x: '8vw', duration: 3.2, ease: 'power3.out' })
      gsap.to('.legs span', { rotate: 18, yoyo: true, repeat: 8, duration: .22, stagger: .08 })
      gsap.to('.flame-puff', { scale: 1.8, opacity: 0, delay: 3.1, duration: .7, ease: 'power2.out' })
      gsap.to('.tiny-flame', { opacity: 0, delay: 3.2, duration: .35 })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <section ref={ref} className="section overflow-hidden py-8 md:py-12">
    <div className="character relative mx-auto flex max-w-xl items-end justify-center gap-5">
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-[#ffd1bd] shadow-glow"><div className="translate-y-7 text-center text-3xl">😊</div></div>
        <div className="mx-auto h-28 w-24 rounded-[2rem] bg-gradient-to-b from-lavender to-blush shadow-card" />
        <div className="legs mx-auto flex w-20 justify-between"><span className="block h-16 w-5 origin-top rounded-full bg-white/80"/><span className="block h-16 w-5 origin-top rounded-full bg-white/80"/></div>
      </div>
      <div className="relative rounded-3xl glass p-5 text-center">
        <div className="mx-auto h-20 w-32 rounded-b-3xl rounded-t-xl bg-pink-300 shadow-glow" />
        <div className="mx-auto h-4 w-36 rounded-full bg-white" />
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-3"><span className="h-10 w-2 bg-white"/><span className="h-10 w-2 bg-white"/><span className="h-10 w-2 bg-white"/></div>
        <div className="tiny-flame absolute left-1/2 top-[-14px] flex -translate-x-1/2 gap-2 text-xl">🔥🔥🔥</div>
        <div className="flame-puff absolute left-1/2 top-[-22px] h-12 w-28 -translate-x-1/2 rounded-full bg-white/50 blur-md" />
        <p className="mt-3 text-sm font-semibold">I brought a cake and a wish.</p>
      </div>
    </div>
  </section>
}
