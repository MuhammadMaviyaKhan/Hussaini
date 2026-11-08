export default function Ornament({ className = '' }) {
  return (
    <span className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament__line" />
      <svg viewBox="0 0 24 24" className="ornament__mark" fill="none">
        <path d="M12 2.5 14.4 9.6 21.5 12l-7.1 2.4L12 21.5l-2.4-7.1L2.5 12l7.1-2.4L12 2.5Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="ornament__line" />
    </span>
  )
}
