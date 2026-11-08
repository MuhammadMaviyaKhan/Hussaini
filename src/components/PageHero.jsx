import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import GeometricPattern from './GeometricPattern'
import Ornament from './Ornament'

export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  arabic,
  intro,
  image,
  breadcrumb = [],
  children,
  compact = false,
  align = 'left',
  imageCaption,
}) {
  const reduce = useReducedMotion()
  return (
    <section
      className={`page-hero ${compact ? 'page-hero--compact' : ''} page-hero--${align}`}
      style={image ? { '--page-hero-image': `url(${image})` } : undefined}
    >
      {image && <div className="page-hero__image" aria-hidden="true" />}
      <div className="page-hero__veil" aria-hidden="true" />
      <GeometricPattern className="page-hero__pattern" opacity={0.1} />
      <div className="container page-hero__inner">
        <motion.div
          className="page-hero__content"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {breadcrumb.length > 0 && (
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {breadcrumb.map((item) => (
                <span key={item.label}>
                  <span className="breadcrumb__sep">/</span>
                  {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {(eyebrow || arabic) && (
            <div className="page-hero__eyebrow">
              <Ornament />
              <span>{eyebrow}</span>
              {arabic && <span className="page-hero__arabic" dir="rtl">{arabic}</span>}
            </div>
          )}
          <h1 className="page-hero__title display">
            {title} {titleAccent && <em>{titleAccent}</em>}
          </h1>
          {intro && <p className="page-hero__intro lead">{intro}</p>}
          {children && <div className="page-hero__actions">{children}</div>}
        </motion.div>
      </div>
      {imageCaption && <span className="page-hero__caption">{imageCaption}</span>}
      <div className="page-hero__bottom" aria-hidden="true">
        <span className="page-hero__line" />
        <span className="page-hero__star">✦</span>
        <span className="page-hero__line" />
      </div>
    </section>
  )
}
