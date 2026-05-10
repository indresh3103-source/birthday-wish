import { motion } from 'framer-motion'

const symbols = ['♡', '✦', '♥', '✧', '❀', '⋆']
export default function FloatingAmbience() {
  return <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
    {Array.from({ length: 34 }).map((_, index) => (
      <motion.span key={index} className="absolute text-white/35 blur-[.2px]" style={{ left: `${(index * 29) % 100}%`, top: `${(index * 47) % 100}%`, fontSize: 12 + (index % 5) * 7 }} animate={{ y: [-20, -90, -20], x: [0, (index % 2 ? 22 : -22), 0], opacity: [.15, .8, .15], rotate: [0, 25, -12] }} transition={{ duration: 7 + (index % 7), repeat: Infinity, delay: index * .18, ease: 'easeInOut' }}>{symbols[index % symbols.length]}</motion.span>
    ))}
  </div>
}
