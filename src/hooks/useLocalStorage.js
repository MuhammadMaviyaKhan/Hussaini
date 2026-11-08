import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage may be unavailable; the UI still works for this visit.
    }
  }, [key, value])

  return [value, setValue]
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage('hussaini:bookmarks', [])

  const toggleBookmark = useCallback(
    (slug) => {
      setBookmarks((current) =>
        current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
      )
    },
    [setBookmarks],
  )

  const isBookmarked = useCallback((slug) => bookmarks.includes(slug), [bookmarks])

  return { bookmarks, toggleBookmark, isBookmarked }
}

export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
