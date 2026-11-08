import { useEffect } from 'react'

const SITE_NAME = 'HUSSAINI — The Path of Ahlulbayt'

export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · HUSSAINI` : SITE_NAME
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
    return () => {
      document.title = SITE_NAME
    }
  }, [title, description])

  return null
}
