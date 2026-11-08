import Reveal from './Reveal'
import Ornament from './Ornament'

export default function SectionHeading({
  eyebrow,
  arabic,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
}) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''} ${className}`}>
      {(eyebrow || arabic) && (
        <div className="section-heading__eyebrow">
          <Ornament />
          <span>{eyebrow}</span>
          {arabic && <span className="section-heading__arabic" dir="rtl">{arabic}</span>}
        </div>
      )}
      <h2 className="section-heading__title display">{title}</h2>
      {intro && <p className="section-heading__intro lead">{intro}</p>}
    </Reveal>
  )
}
