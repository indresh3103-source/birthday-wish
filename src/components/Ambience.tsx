"use client";

import { Music, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

const hearts = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index * 0.47) % 9}s`,
  size: 14 + (index % 5) * 5
}));

export function Ambience() {
  const [music, setMusic] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="noise" />
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute top-0 animate-heartRain text-blush/45 blur-[.2px]"
            style={{ left: heart.left, animationDelay: heart.delay, fontSize: heart.size }}
          >
            ❤️
          </span>
        ))}
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={`butterfly-${index}`}
            className="absolute animate-float text-xl opacity-60"
            style={{ left: `${(index * 17) % 100}%`, top: `${12 + ((index * 23) % 70)}%`, animationDelay: `${index * 0.6}s` }}
          >
            🦋
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setMusic((value) => !value)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-glow backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
        aria-label="Toggle romantic background music"
      >
        {music ? <Music size={18} /> : <VolumeX size={18} />}
        {music ? "Music On" : "Music Off"}
      </button>
      {music && <div className="fixed bottom-24 right-6 z-50 rounded-2xl bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl">♪ Imagine a soft piano love theme playing...</div>}
    </>
  );
}
