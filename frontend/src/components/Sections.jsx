import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import confetti from 'canvas-confetti'
import { Heart, Image as ImageIcon, Lock, Mail, Mic, Send, Sparkles, Star } from 'lucide-react'
import { api } from '../utils/api'
import { birthdayDate, gallery, girlfriendName, memories, quizQuestions, secretPassword } from '../data/content'
import { useCountdown } from '../hooks/useCountdown'
import ThreeCake from './ThreeCake'

gsap.registerPlugin(ScrollTrigger)
const reveal = { hidden: { opacity: 0, y: 38 }, visible: { opacity: 1, y: 0 } }

export function Hero() {
  const ref = useRef(null)
  useEffect(() => { const ctx = gsap.context(() => gsap.from('.hero-word', { y: 80, opacity: 0, stagger: .09, duration: 1, ease: 'power4.out', delay: .2 }), ref); return () => ctx.revert() }, [])
  return <section ref={ref} className="section flex min-h-screen items-center justify-center overflow-hidden bg-radialGlow pt-28 text-center">
    <motion.div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blush/25 blur-3xl" animate={{ scale: [1, 1.35, 1], opacity: [.45, .75, .45] }} transition={{ duration: 5, repeat: Infinity }} />
    <div className="relative max-w-5xl">
      <p className="hero-word font-script text-5xl text-pink-100 md:text-8xl">Happy Birthday</p>
      <h1 className="hero-word mt-4 font-display text-5xl font-extrabold leading-tight text-gradient md:text-8xl">{girlfriendName}, you are my favorite miracle.</h1>
      <p className="hero-word mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">I built this tiny cinematic universe so every animation, memory, note, sparkle, and candle could say what my heart repeats every day: I love you.</p>
      <a href="#message" className="hero-word luxury-button mt-10 inline-flex rounded-full px-8 py-4 font-bold transition hover:-translate-y-1 hover:scale-105">Open my heart <Heart className="ml-2" size={20}/></a>
    </div>
  </section>
}

export function Countdown() {
  const time = useCountdown(birthdayDate)
  return <section className="section" id="countdown"><Title eyebrow="The heartbeat before midnight" title="Birthday Countdown" />
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">{Object.entries(time).map(([label, value]) => <motion.div key={label} className="glass rounded-[2rem] p-6 text-center" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><motion.div key={value} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-5xl font-bold text-gradient md:text-7xl">{String(value).padStart(2, '0')}</motion.div><p className="mt-2 uppercase tracking-[.35em] text-white/55">{label}</p></motion.div>)}</div>
  </section>
}

export function Timeline() {
  useEffect(() => { const ctx = gsap.context(() => gsap.utils.toArray('.timeline-card').forEach((card) => gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 82%' }, opacity: 0, y: 80, rotateX: 8, duration: .9, ease: 'power3.out' }))); return () => ctx.revert() }, [])
  return <section className="section" id="memories"><Title eyebrow="Our little forever" title="Memory Timeline" />
    <div className="mx-auto max-w-5xl space-y-10">{memories.map((memory, index) => <article key={memory.title} className={`timeline-card grid items-center gap-8 rounded-[2rem] glass p-5 md:grid-cols-2 ${index % 2 ? 'md:[&>img]:order-2' : ''}`}><img src={memory.image} alt={memory.title} className="h-72 w-full rounded-[1.5rem] object-cover shadow-card" loading="lazy"/><div><p className="font-script text-3xl text-pink-200">{memory.date}</p><h3 className="mt-2 font-display text-3xl font-bold">{memory.title}</h3><p className="mt-4 leading-8 text-white/70">{memory.text}</p></div></article>)}</div>
  </section>
}

export function Gallery() {
  const [active, setActive] = useState(null)
  return <section className="section" id="gallery"><Title eyebrow="Frames of my heart" title="Romantic Gallery" />
    <div className="mx-auto columns-1 gap-5 space-y-5 md:columns-3">{gallery.map((src, i) => <button key={src} onClick={() => setActive(src)} className="photo-card block break-inside-avoid rounded-[1.8rem] bg-white p-3 pb-10 text-left shadow-card transition duration-500" style={{ rotate: `${(i % 3 - 1) * 2}deg` }}><img src={src} alt={`Romantic memory ${i + 1}`} className="w-full rounded-[1.2rem] object-cover" loading="lazy"/><span className="mt-3 flex items-center gap-2 px-2 text-sm font-bold text-night"><ImageIcon size={16}/> Memory #{i + 1}</span></button>)}</div>
    <AnimatePresence>{active && <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5" onClick={() => setActive(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.img src={active} alt="Expanded romantic memory" className="max-h-[86vh] max-w-5xl rounded-[2rem] object-contain shadow-glow" initial={{ scale: .82 }} animate={{ scale: 1 }} /></motion.div>}</AnimatePresence>
  </section>
}

export function MessageForm() {
  const [text, setText] = useState(''); const [status, setStatus] = useState('')
  const submit = async (e) => { e.preventDefault(); setStatus('Sending...'); try { await api.sendMessage({ name: girlfriendName, message: text }); setText(''); setStatus('Sent straight to my heart ❤️') } catch (err) { setStatus(err.message) } }
  return <section className="section" id="message"><Title eyebrow="Your turn" title="Write Something For Me ❤️" />
    <form onSubmit={submit} className="mx-auto max-w-3xl rounded-[2rem] glass p-6 md:p-10"><textarea required value={text} onChange={(e) => setText(e.target.value)} minLength={3} className="min-h-48 w-full resize-none rounded-[1.5rem] border border-white/15 bg-white/10 p-5 text-lg outline-none ring-blush/40 transition placeholder:text-white/45 focus:ring-4" placeholder="Write anything your heart wants to say..."/><button className="luxury-button mt-5 inline-flex rounded-full px-7 py-3 font-bold">Send with love <Send className="ml-2" size={18}/></button><p className="mt-4 text-white/70">{status}</p></form>
  </section>
}

export function Quiz() {
  const [answers, setAnswers] = useState({}); const [reaction, setReaction] = useState('😍'); const love = Object.keys(answers).length * 30 + (reaction ? 10 : 0); const [status, setStatus] = useState('')
  const submit = async () => { setStatus('Saving...'); try { await api.sendQuiz({ answers, loveMeter: Math.min(love, 100), reaction }); await api.sendReaction({ emoji: reaction, context: 'quiz' }); setStatus('Saved and notified 💌') } catch (err) { setStatus(err.message) } }
  return <section className="section"><Title eyebrow="Playful love data" title="Quiz & Reactions" />
    <div className="mx-auto max-w-4xl rounded-[2rem] glass p-6 md:p-10">{quizQuestions.map((q) => <div key={q.id} className="mb-8"><h3 className="font-display text-2xl">{q.question}</h3><div className="mt-4 flex flex-wrap gap-3">{q.options.map((option) => <button key={option} onClick={() => setAnswers({ ...answers, [q.id]: option })} className={`rounded-full border px-5 py-3 transition ${answers[q.id] === option ? 'border-blush bg-blush/35' : 'border-white/15 bg-white/10 hover:bg-white/20'}`}>{option}</button>)}</div></div>)}<div className="flex flex-wrap items-center gap-4 text-4xl">{['😍','🥹','😘','💖','✨'].map((emoji) => <button key={emoji} onClick={() => setReaction(emoji)} className={reaction === emoji ? 'scale-125' : 'opacity-60'}>{emoji}</button>)}</div><div className="mt-7 h-5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-blush to-lavender" animate={{ width: `${Math.min(love, 100)}%` }} /></div><p className="mt-2 text-white/70">Love meter: {Math.min(love, 100)}%</p><button onClick={submit} className="luxury-button mt-6 rounded-full px-7 py-3 font-bold">Lock my answers</button><p className="mt-4 text-white/70">{status}</p></div>
  </section>
}

export function VoiceNote() {
  const [file, setFile] = useState(null); const [status, setStatus] = useState('')
  const submit = async (e) => { e.preventDefault(); if (!file) return; const fd = new FormData(); fd.append('voice', file); fd.append('name', girlfriendName); setStatus('Uploading...'); try { await api.uploadVoice(fd); setStatus('Voice note saved and notification sent 🎙️') } catch (err) { setStatus(err.message) } }
  return <section className="section"><Title eyebrow="A sound I can keep" title="Voice Note Upload" />
    <form onSubmit={submit} className="mx-auto max-w-2xl rounded-[2rem] glass p-8 text-center"><Mic className="mx-auto text-pink-200" size={46}/><input type="file" accept="audio/*" capture="microphone" onChange={(e) => setFile(e.target.files?.[0])} className="mt-6 w-full rounded-2xl border border-white/15 bg-white/10 p-4"/><button className="luxury-button mt-6 rounded-full px-7 py-3 font-bold">Upload voice note</button><p className="mt-4 text-white/70">{status}</p></form>
  </section>
}

export function SecretMessage() {
  const [value, setValue] = useState(''); const [open, setOpen] = useState(false)
  return <section className="section"><Title eyebrow="Only you can open it" title="Secret Message Unlock" />
    <div className="mx-auto max-w-3xl rounded-[2rem] glass p-8 text-center"><div className="relative mx-auto mb-8 h-48 max-w-sm rounded-b-3xl bg-gradient-to-br from-pink-300 to-lavender p-6 shadow-glow"><motion.div className="envelope-flap absolute inset-x-0 top-0 h-28 rounded-t-3xl bg-pink-200" animate={{ rotateX: open ? 140 : 0 }} /><Mail className="relative z-10 mx-auto mt-16 text-night" size={44}/></div>{!open ? <div className="flex flex-col gap-3 sm:flex-row"><input value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 outline-none" placeholder="Secret password"/><button onClick={() => setOpen(value.toLowerCase() === secretPassword.toLowerCase())} className="luxury-button rounded-full px-6 py-3 font-bold"><Lock className="mr-2 inline" size={17}/>Unlock</button></div> : <motion.p className="mx-auto max-w-2xl font-script text-4xl leading-relaxed text-pink-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>If I could gift you the sky, I would still feel it was too small. You are my peace, my spark, and my forever favorite person.</motion.p>}</div>
  </section>
}

export function CakeSection() {
  const [blown, setBlown] = useState(false)
  const blow = () => { setBlown(true); confetti({ particleCount: 220, spread: 90, origin: { y: .65 } }) }
  return <section className="section"><Title eyebrow="Make a wish" title="3D Birthday Cake" />
    <div className="mx-auto max-w-5xl rounded-[2rem] glass p-5 text-center md:p-10"><ThreeCake blown={blown}/><button onClick={blow} className="luxury-button rounded-full px-8 py-4 font-bold">Blow the candles ✨</button><p className="mt-4 text-white/65">Microphone blow detection can be enabled later with the Web Audio API; this button keeps the experience reliable on every device.</p></div>
  </section>
}

export function FinalSurprise() {
  const fire = () => confetti({ particleCount: 320, spread: 120, origin: { y: .65 }, ticks: 300 })
  return <section className="section min-h-screen text-center"><div className="mx-auto max-w-5xl rounded-[2.5rem] glass p-8 md:p-16"><Sparkles className="mx-auto text-pink-200" size={52}/><p className="mt-6 font-script text-6xl text-pink-100 md:text-8xl">I Love You</p><h2 className="mt-6 font-display text-4xl font-extrabold text-gradient md:text-7xl">Today is yours. My heart is yours. This story is ours.</h2><button onClick={fire} className="luxury-button mt-10 rounded-full px-8 py-4 font-bold">Final surprise fireworks <Star className="ml-2 inline" size={18}/></button></div></section>
}

function Title({ eyebrow, title }) {
  return <motion.div className="mx-auto mb-12 max-w-3xl text-center" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><p className="font-script text-4xl text-pink-200 md:text-5xl">{eyebrow}</p><h2 className="mt-2 font-display text-4xl font-extrabold text-gradient md:text-6xl">{title}</h2></motion.div>
}
