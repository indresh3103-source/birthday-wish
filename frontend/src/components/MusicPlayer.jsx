import { Music, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer({ enabled }) {
  const [playing, setPlaying] = useState(false)
  const audio = useRef(null)
  useEffect(() => { audio.current = new Audio('/romantic-ambient.mp3'); audio.current.loop = true; audio.current.volume = 0 }, [])
  useEffect(() => { if (enabled && audio.current && !playing) setPlaying(false) }, [enabled, playing])
  const toggle = async () => {
    if (!audio.current) return
    if (playing) {
      const fade = setInterval(() => { audio.current.volume = Math.max(0, audio.current.volume - .05); if (audio.current.volume === 0) { audio.current.pause(); clearInterval(fade) } }, 60)
      setPlaying(false)
    } else {
      await audio.current.play().catch(() => {})
      const fade = setInterval(() => { audio.current.volume = Math.min(.42, audio.current.volume + .04); if (audio.current.volume >= .42) clearInterval(fade) }, 70)
      setPlaying(true)
    }
  }
  return <button onClick={toggle} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full glass px-4 py-3 text-sm font-semibold text-white transition hover:scale-105" aria-label="Toggle background music"><Music size={18}/>{playing ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button>
}
