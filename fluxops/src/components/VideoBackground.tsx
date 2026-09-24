import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useScrollVideo } from '../hooks/useScrollVideo'

/**
 * Full-viewport, fixed video background (z-0).
 * - Desktop / tablet: playhead is scrubbed by window.scrollY (lerp-smoothed).
 *   Tablet scrubs "slower" via a gentler lerp factor.
 * - Mobile (<768px) or reduced-motion: static poster image with subtle
 *   parallax instead — no decode cost, saves battery.
 */
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const isMobile = useMediaQuery('(max-width: 767px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const scrubEnabled = !isMobile && !prefersReducedMotion

  // Gentle scroll-scrub on tablets (768–1023px), snappier on desktop.
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  useScrollVideo(videoRef, {
    enabled: scrubEnabled,
    lerp: isTablet ? 0.05 : 0.1,
    endProgress: 0.85,
  })

  // Subtle parallax fallback for the mobile poster.
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden bg-flux-bg pointer-events-none"
    >
      {/* Radial-gradient masked media layer — edges fade into black */}
      <div className="video-mask absolute inset-0">
        {scrubEnabled ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-70"
            src="/assets/flux-flow.mp4"
            poster="/assets/flux-poster.jpg"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            tabIndex={-1}
            aria-label="Abstract visualization of scattered data aligning into connected workflows"
          />
        ) : (
          <motion.img
            src="/assets/flux-poster.jpg"
            alt=""
            initial={false}
            style={{ y }}
            className="absolute inset-0 h-[120%] w-full object-cover opacity-60 will-change-transform"
          />
        )}
      </div>

      {/* Dark vignette overlay for text readability regardless of frame brightness */}
      <div className="absolute inset-0 bg-gradient-to-b from-flux-bg/80 via-flux-bg/30 to-flux-bg" />
      <div className="absolute inset-0 bg-[#0a0a0a]/30" />
    </div>
  )
}
