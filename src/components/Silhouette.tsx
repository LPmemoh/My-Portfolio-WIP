import { useId, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type SilhouetteProps = {
  src: string
  className?: string
  style?: CSSProperties
  /** Ring thickness in pixels */
  thickness?: number
  /** Rotation duration for the gradient */
  duration?: string
}

/**
 * Renders a rotating conic‑gradient ring that hugs the opaque silhouette
 * of the provided PNG (uses SVG mask + morphology). Works best with images
 * that have transparent backgrounds.
 */
export default function Silhouette({
  src,
  className = '',
  style,
  thickness = 4,
  duration = '8s',
}: SilhouetteProps) {
  const uid = useId().replace(/:/g, '_')
  const filterId = `silhouetteRingFilter_${uid}`
  const maskId = `silhouetteRingMask_${uid}`

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
    }
    update()
    const ro = new (window as any).ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Convert pixel thickness to normalized filter radii (objectBoundingBox units), clamp to avoid 0.
  const rxRaw = thickness / dims.w
  const ryRaw = thickness / dims.h
  const rx = Math.max(rxRaw, 1 / Math.max(dims.w, 1))
  const ry = Math.max(ryRaw, 1 / Math.max(dims.h, 1))

  const gradientStyle: CSSProperties = {
    width: '120%',
    height: '120%',
    background: 'conic-gradient(from 180deg, #6366f1, #22d3ee, #f43f5e, #6366f1)',
    animation: `spin ${duration} linear infinite`,
  }

  return (
    <div ref={containerRef} className={`relative overflow-visible ${className}`} style={style}>
      {/* Rotating gradient ring masked to the image silhouette */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Extract a ring from the image alpha: dilate(SourceAlpha) OUT SourceAlpha */}
          <filter id={filterId} x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
              <>
                <feMorphology in="SourceAlpha" operator="dilate" radius={`${rx} ${ry}`} result="morph" />
                <feComposite in="morph" in2="SourceAlpha" operator="out" result="ring" />
              </>
            {/* Paint ring as white for mask luminance */}
            <feColorMatrix in="ring" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>

          <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <g filter={`url(#${filterId})`}>
              {/* Coordinates in objectBoundingBox units (0..1) for reliability */}
              <image href={src} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid meet" />
            </g>
          </mask>
        </defs>

        {/* Gradient layer clipped by the ring mask */}
        <foreignObject x="0" y="0" width="100%" height="100%" mask={`url(#${maskId})`}>
          <div style={gradientStyle} />
        </foreignObject>
      </svg>

      {/* Actual image content on top */}
      <img src={src} className="relative w-full h-full object-contain pointer-events-none" />
    </div>
  )
}
