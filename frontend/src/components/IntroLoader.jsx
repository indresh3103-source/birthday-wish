import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function IntroLoader({ onDone }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => { setShow(false); onDone?.() }, 3300)
    return () => clearTimeout(id)
  }, [onDone])
  return <AnimatePresence>
    {show && <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-radialGlow" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }} transition={{ duration: 1.1 }}>
      <motion.div className="absolute h-[42rem] w-[42rem] rounded-full bg-blush/20 blur-3xl" animate={{ scale: [1, 1.25, 1], rotate: 360 }} transition={{ duration: 7, repeat: Infinity }} />
      <div className="relative px-6 text-center">
        <motion.p className="font-script text-4xl text-pink-100 md:text-7xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>A little universe is opening...</motion.p>
        <motion.h1 className="mt-5 font-display text-4xl font-extrabold text-gradient md:text-7xl" initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.05em' }} transition={{ delay: .6, duration: 1.3 }}>For You</motion.h1>
        <motion.div className="mx-auto mt-10 h-1 max-w-xs overflow-hidden rounded-full bg-white/15"><motion.div className="h-full rounded-full bg-white" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.6, ease: 'easeInOut' }} /></motion.div>
      </div>
    </motion.div>}
  </AnimatePresence>
}
