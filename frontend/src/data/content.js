export const birthdayDate = import.meta.env.VITE_BIRTHDAY_DATE || '2026-12-31T00:00:00'
export const girlfriendName = import.meta.env.VITE_GIRLFRIEND_NAME || 'My Love'
export const secretPassword = import.meta.env.VITE_SECRET_PASSWORD || 'forever'

export const memories = [
  { date: 'The first hello', title: 'The day the world softened', text: 'One conversation became the beginning of my favorite chapter.', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=80' },
  { date: 'Our laughter era', title: 'Tiny moments, giant happiness', text: 'Every joke, every smile, every silly look became a memory I replay.', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80' },
  { date: 'Today', title: 'Your birthday universe', text: 'Tonight, every star feels like it was lit just to celebrate you.', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80' }
]

export const gallery = [
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=900&q=80'
]

export const quizQuestions = [
  { id: 'first-date', question: 'What should our next magical date feel like?', options: ['Stargazing picnic', 'Candlelight dinner', 'Road-trip sunrise'] },
  { id: 'love-language', question: 'Which surprise melts your heart most?', options: ['Letters', 'Flowers', 'Songs'] },
  { id: 'hug-duration', question: 'How long should my birthday hug last?', options: ['10 seconds', '10 minutes', 'Forever'] }
]
