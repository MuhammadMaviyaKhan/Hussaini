import { useId } from 'react'

export default function GeometricPattern({ className = '', opacity = 0.16, scale = 1 }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      className={`geometric-pattern ${className}`}
      viewBox="0 0 480 480"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <pattern id={`geo-${id}`} width="80" height="80" patternUnits="userSpaceOnUse" patternTransform={`scale(${scale})`}>
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M40 0 48 32 80 40 48 48 40 80 32 48 0 40 32 32Z" />
            <path d="M40 10 46 34 70 40 46 46 40 70 34 46 10 40 34 34Z" opacity=".55" />
            <circle cx="40" cy="40" r="6" />
            <path d="M0 0h80v80H0z" opacity=".18" />
          </g>
        </pattern>
      </defs>
      <rect width="480" height="480" fill={`url(#geo-${id})`} />
    </svg>
  )
}
