import { useCallback, useState } from 'react'
import FloatingAmbience from './components/FloatingAmbience'
import IntroLoader from './components/IntroLoader'
import MusicPlayer from './components/MusicPlayer'
import WalkingCharacter from './components/WalkingCharacter'
import { CakeSection, Countdown, FinalSurprise, Gallery, Hero, MessageForm, Quiz, SecretMessage, Timeline, VoiceNote } from './components/Sections'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const done = useCallback(() => setIntroDone(true), [])
  return <main className="relative min-h-screen overflow-hidden bg-night text-white">
    <IntroLoader onDone={done} />
    <FloatingAmbience />
    <MusicPlayer enabled={introDone} />
    <Hero />
    <WalkingCharacter />
    <Countdown />
    <Timeline />
    <Gallery />
    <MessageForm />
    <Quiz />
    <VoiceNote />
    <SecretMessage />
    <CakeSection />
    <FinalSurprise />
  </main>
}
