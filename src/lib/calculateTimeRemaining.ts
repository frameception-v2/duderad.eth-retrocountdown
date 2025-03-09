export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function calculateTimeRemaining(): TimeRemaining {
  // Get now in UTC
  const now = new Date()
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  )

  // Get next Friday 17:00 UTC
  const nextFriday = new Date(nowUTC)
  nextFriday.setUTCDate(now.getUTCDate() + ((5 - now.getUTCDay() + 7) % 7))
  nextFriday.setUTCHours(17, 0, 0, 0)

  // Handle case when it's already past Friday 17:00 UTC
  if (nextFriday.getTime() < nowUTC) {
    nextFriday.setUTCDate(nextFriday.getUTCDate() + 7)
  }

  // Calculate difference in seconds
  const diff = (nextFriday.getTime() - nowUTC) / 1000

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: Math.floor(diff % 60)
  }
}
