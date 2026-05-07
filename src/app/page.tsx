"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gift, Heart, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Ambience } from "@/components/Ambience";
import { memories, quotes, reasons } from "@/lib/content";

const CinematicScene = dynamic(() => import("@/components/CinematicScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-[#110719]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transitionEnd: { display: "none" } }}
      transition={{ delay: 1.6, duration: 0.9, ease: "easeInOut" }}
    >
      <motion.div className="text-center" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
        <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full border border-white/20 bg-white/10 shadow-glow backdrop-blur-xl">
          <Heart className="fill-blush text-blush" size={42} />
        </div>
        <p className="font-display text-4xl gold-text">Preparing her magical birthday world...</p>
      </motion.div>
    </motion.div>
  );
}

function PixarBoy() {
  return (
    <motion.div
      className="absolute bottom-14 left-4 z-20 hidden md:block"
      initial={{ x: -260, opacity: 0 }}
      animate={{ x: [ -260, 120, 215 ], opacity: 1 }}
      transition={{ duration: 5.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.7, repeat: Infinity }} className="relative h-64 w-40">
        <div className="absolute left-10 top-6 h-20 w-20 rounded-full bg-peach shadow-gold">
          <div className="absolute left-4 top-7 h-3 w-3 rounded-full bg-midnight" />
          <div className="absolute right-4 top-7 h-3 w-3 rounded-full bg-midnight" />
          <div className="absolute left-7 top-12 h-3 w-7 rounded-b-full border-b-2 border-rose-500" />
          <div className="absolute -top-5 left-2 h-10 w-16 rounded-[45%] bg-amber-900" />
        </div>
        <div className="absolute left-11 top-24 h-24 w-20 rounded-t-full bg-gradient-to-b from-lavender to-blush shadow-glow" />
        <div className="absolute left-2 top-24 h-4 w-20 -rotate-12 rounded-full bg-peach" />
        <div className="absolute left-0 top-16 text-5xl">💐</div>
        <div className="absolute right-0 top-2 text-5xl">🎈</div>
        <div className="absolute right-5 top-12 text-4xl">🎈</div>
        <motion.div animate={{ rotate: [-7, 8, -7] }} transition={{ duration: 0.8, repeat: Infinity }} className="absolute left-11 top-[11.5rem] h-20 w-5 rounded-full bg-indigo-950" />
        <motion.div animate={{ rotate: [8, -7, 8] }} transition={{ duration: 0.8, repeat: Infinity }} className="absolute left-24 top-[11.5rem] h-20 w-5 rounded-full bg-indigo-950" />
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const [surprise, setSurprise] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setSurprise(true), 5200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 text-center">
      <CinematicScene />
      <PixarBoy />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_55%,transparent_0%,rgba(19,9,31,.22)_42%,rgba(19,9,31,.88)_100%)]" />
      <motion.div className="relative z-20 mx-auto max-w-5xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.2 }}>
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.5em] text-gold">A private universe made for you</p>
        <h1 className="font-display text-6xl font-bold leading-none text-glow sm:text-8xl lg:text-9xl">
          Happy Birthday
          <span className="block gold-text">My Love ❤️</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-white/78 sm:text-xl">
          Tonight a cartoon boy, a glowing cake, fireworks, butterflies, hearts, and every tiny star came together to celebrate the girl I adore.
        </p>
        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
          <a href="#intro" className="rounded-full bg-gradient-to-r from-blush via-lavender to-gold px-8 py-4 font-bold text-midnight shadow-glow transition hover:scale-105">Enter the surprise</a>
          <button onClick={() => setSurprise(true)} className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/20">Blow candles</button>
        </div>
      </motion.div>
      <AnimatePresence>
        {surprise && (
          <motion.div className="pointer-events-none absolute inset-0 z-30 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,211,110,.22),transparent_35%)]" />
            {Array.from({ length: 80 }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute text-2xl"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x: Math.cos(index) * (120 + (index % 9) * 35), y: Math.sin(index * 1.7) * (120 + (index % 8) * 28), opacity: 0, scale: 1.4, rotate: 360 }}
                transition={{ duration: 2.4, ease: "easeOut" }}
              >
                {index % 3 === 0 ? "✨" : index % 3 === 1 ? "🎊" : "💖"}
              </motion.span>
            ))}
            <motion.p className="font-display text-5xl font-bold gold-text sm:text-7xl" initial={{ scale: 0.45, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.45 }}>Make a wish, my love</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [10, -10]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-10, 10]), { stiffness: 180, damping: 18 });
  return (
    <motion.div
      className={`glass transform-3d rounded-[2rem] ${className}`}
      style={{ rotateX, rotateY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ y: -10, scale: 1.025 }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.45em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-5xl font-bold text-white sm:text-7xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-white/70">{copy}</p>
    </div>
  );
}

function Intro() {
  const [quote, setQuote] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setQuote((value) => (value + 1) % quotes.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <section id="intro" className="section-shell">
      <SectionTitle eyebrow="Romantic intro" title="A love letter made of light" copy="A dreamy opening wrapped in sparkles, animated gradients, soft particles, and a quote that keeps changing like a little heartbeat." />
      <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12">
        <Sparkles className="mb-5 text-gold" size={34} />
        <AnimatePresence mode="wait">
          <motion.p key={quote} className="font-display text-4xl leading-tight gold-text sm:text-6xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
            {quotes[quote]}
          </motion.p>
        </AnimatePresence>
        <p className="mt-8 max-w-3xl text-xl text-white/74">If I could wrap the sky in ribbon and gift it to you, I would. So I built this tiny universe instead.</p>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Memory gallery" title="Floating frames of us" copy="Replace these dreamy placeholders with your favorite photos; the glass cards already have hover zoom and cinematic modal reveals." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory, index) => (
          <motion.button key={memory.title} onClick={() => setActive(index)} className="group glass overflow-hidden rounded-[2rem] p-4 text-left" whileHover={{ y: -12 }}>
            <div className={`h-64 rounded-[1.4rem] bg-gradient-to-br ${memory.gradient} p-6 transition duration-500 group-hover:scale-[1.03]`}>
              <div className="grid h-full place-items-center rounded-[1rem] border border-white/35 bg-white/15 text-6xl backdrop-blur-sm">📸</div>
            </div>
            <h3 className="mt-5 font-display text-3xl text-white">{memory.title}</h3>
            <p className="mt-2 text-white/66">{memory.caption}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-midnight/80 p-5 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div className="glass max-w-2xl rounded-[2.5rem] p-6" initial={{ scale: 0.75, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.75, y: 50 }} onClick={(e) => e.stopPropagation()}>
              <div className={`h-[55vh] rounded-[2rem] bg-gradient-to-br ${memories[active].gradient} p-8`}><div className="grid h-full place-items-center rounded-[1.5rem] border border-white/40 bg-white/15 text-8xl">💞</div></div>
              <h3 className="mt-5 font-display text-4xl">{memories[active].title}</h3>
              <p className="text-white/70">{memories[active].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Reasons() {
  return (
    <section className="section-shell perspective-1000">
      <SectionTitle eyebrow="Reasons I love you" title="Six glowing little truths" copy="Every card reacts to the mouse with a gentle 3D tilt, luminous borders, and premium floating motion." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <TiltCard key={reason} className="p-7">
            <div className="mb-12 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-gold text-2xl shadow-gold">{index + 1}</div>
            <p className="font-display text-3xl leading-tight text-white">{reason}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function GiftBox() {
  const [open, setOpen] = useState(false);
  return (
    <section className="section-shell text-center">
      <SectionTitle eyebrow="Virtual gift box" title="Tap to open a tiny forever" copy="A soft 3D-style gift interaction reveals hearts, roses, and a birthday message just for her." />
      <button onClick={() => setOpen(true)} className="group mx-auto grid place-items-center">
        <motion.div className="relative h-64 w-64" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
          <motion.div animate={open ? { y: -92, rotate: -14 } : { y: 0, rotate: 0 }} className="absolute left-2 top-10 h-20 w-60 rounded-2xl bg-gradient-to-r from-gold to-peach shadow-gold" />
          <div className="absolute bottom-0 left-8 h-44 w-52 rounded-3xl bg-gradient-to-br from-lavender to-blush shadow-glow" />
          <div className="absolute bottom-0 left-[118px] h-44 w-8 bg-gold" />
          <div className="absolute bottom-20 left-8 h-8 w-52 bg-gold" />
          <Gift className="absolute left-[104px] top-[118px] text-white" size={54} />
          {open && Array.from({ length: 18 }).map((_, i) => <motion.span key={i} className="absolute left-28 top-24 text-3xl" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: 1, x: Math.cos(i) * 150, y: -70 - (i % 5) * 35 }} transition={{ duration: 2.2 }}> {i % 2 ? "🌹" : "💖"}</motion.span>)}
        </motion.div>
      </button>
      {open && <motion.p className="mx-auto mt-8 max-w-2xl font-display text-4xl gold-text" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>My real gift is choosing you every day. Happy birthday, beautiful.</motion.p>}
    </section>
  );
}

function CakeSection() {
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Interactive cake" title="Candles, icing, and wishes" copy="A glowing birthday cake scene with flickering candle flames and floating icing particles for a playful magical moment." />
      <div className="glass relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] p-10 text-center">
        <div className="relative mx-auto h-72 w-72">
          <div className="absolute bottom-6 left-8 h-20 w-56 rounded-b-[3rem] rounded-t-xl bg-gradient-to-b from-pink-200 to-blush shadow-glow" />
          <div className="absolute bottom-24 left-14 h-16 w-44 rounded-b-[2rem] rounded-t-xl bg-gradient-to-b from-white to-peach" />
          {[82, 132, 182].map((left) => <div key={left} className="absolute bottom-40" style={{ left }}><div className="mx-auto h-12 w-3 rounded-full bg-white" /><div className="flame animate-flame" /></div>)}
          {Array.from({ length: 20 }).map((_, i) => <span key={i} className="absolute animate-twinkle rounded-full bg-white" style={{ left: `${(i * 41) % 100}%`, top: `${(i * 29) % 100}%`, width: 4 + (i % 3) * 3, height: 4 + (i % 3) * 3 }} />)}
        </div>
        <p className="font-display text-4xl gold-text">Blow gently and wish for everything your heart wants.</p>
      </div>
    </section>
  );
}

function LoveCounter() {
  const start = useMemo(() => new Date("2024-02-14T00:00:00"), []);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const seconds = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Love counter" title="Every second, still choosing you" copy="Update the start date in code to match your real anniversary and this glowing timer will count your love story live." />
      <div className="grid gap-5 sm:grid-cols-4">
        {[ ["Days", days], ["Hours", hours], ["Minutes", minutes], ["Seconds", secs] ].map(([label, value]) => (
          <div key={label} className="glass rounded-[2rem] p-7 text-center shadow-glow"><p className="font-mono text-5xl font-black text-gold">{String(value).padStart(2, "0")}</p><p className="mt-2 uppercase tracking-[0.35em] text-white/55">{label}</p></div>
        ))}
      </div>
    </section>
  );
}

function NightScene() {
  return (
    <section className="section-shell overflow-hidden">
      <SectionTitle eyebrow="Romantic night scene" title="Moonlit lantern wishes" copy="Clouds drift, lanterns float, and shooting stars cross the sky while the page slows into a dreamy cinematic rhythm." />
      <div className="glass relative h-[620px] overflow-hidden rounded-[3rem] bg-gradient-to-b from-indigo-950 via-purple-950 to-[#17091f]">
        <div className="absolute right-16 top-16 h-32 w-32 rounded-full bg-champagne shadow-[0_0_80px_rgba(255,246,223,.75)]" />
        {Array.from({ length: 35 }).map((_, i) => <span key={i} className="absolute animate-twinkle rounded-full bg-white" style={{ left: `${(i * 31) % 100}%`, top: `${(i * 17) % 58}%`, width: 2 + (i % 3), height: 2 + (i % 3), animationDelay: `${i * 0.15}s` }} />)}
        {Array.from({ length: 9 }).map((_, i) => <motion.div key={i} className="absolute text-5xl" style={{ left: `${8 + i * 10}%`, bottom: `${40 + (i % 4) * 34}px` }} animate={{ y: [-10, -75, -10], opacity: [0.45, 1, 0.45] }} transition={{ duration: 7 + i, repeat: Infinity }}>🏮</motion.div>)}
        <motion.div className="absolute left-[-15%] top-24 h-16 w-72 rounded-full bg-white/15 blur-xl" animate={{ x: [0, 900] }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute right-[-8%] top-56 h-20 w-96 rounded-full bg-white/10 blur-2xl" animate={{ x: [0, -900] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute top-28 h-1 w-32 rotate-[-18deg] rounded-full bg-gradient-to-r from-transparent via-white to-gold" animate={{ x: [-200, 1100], y: [0, 250], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }} />
      </div>
    </section>
  );
}

function SecretMessage() {
  const [open, setOpen] = useState(false);
  return (
    <section className="section-shell text-center">
      <SectionTitle eyebrow="Secret message" title="One little heart lock" copy="A hidden message opens with a soft pulse, like a private note tucked inside the universe." />
      <motion.button onClick={() => setOpen(!open)} className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-blush to-gold text-midnight shadow-glow" animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <Heart className="fill-current" size={76} />
      </motion.button>
      <AnimatePresence>{open && <motion.div className="glass mx-auto mt-10 max-w-3xl rounded-[2.5rem] p-10" initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.9 }}><p className="font-display text-4xl leading-tight gold-text">You are loved in the quiet moments, the loud celebrations, and every heartbeat between. I hope this birthday feels as special as you make my life feel.</p></motion.div>}</AnimatePresence>
    </section>
  );
}

function Ending() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,143,189,.18),transparent_35%),linear-gradient(#090411,#18091f)]" />
      {Array.from({ length: 55 }).map((_, i) => <span key={i} className="absolute animate-twinkle rounded-full bg-white" style={{ left: `${(i * 13) % 100}%`, top: `${(i * 19) % 70}%`, width: 2 + (i % 4), height: 2 + (i % 4) }} />)}
      <motion.div className="relative z-10" initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 5 }}>
        <div className="mb-12 text-8xl">👫</div>
        <h2 className="font-display text-6xl font-bold gold-text sm:text-8xl">Forever looks beautiful with you.</h2>
        <p className="mx-auto mt-8 max-w-2xl text-xl text-white/72">Happy Birthday My Love ❤️ May your year be gentle, glowing, wildly happy, and full of every dream you deserve.</p>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        gsap.fromTo(section, { opacity: 0.45, y: 80 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 78%" } });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={main} className="relative overflow-hidden">
      <LoadingScreen />
      <Ambience />
      <Hero />
      <Intro />
      <Gallery />
      <Reasons />
      <GiftBox />
      <CakeSection />
      <LoveCounter />
      <NightScene />
      <SecretMessage />
      <Ending />
    </main>
  );
}
