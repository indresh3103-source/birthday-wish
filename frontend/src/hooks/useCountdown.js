import { useEffect, useState } from 'react'

function diff(target) {
  const distance = Math.max(new Date(target).getTime() - Date.now(), 0)
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  }
}

export function useCountdown(target) {
  const [time, setTime] = useState(() => diff(target))
  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}
