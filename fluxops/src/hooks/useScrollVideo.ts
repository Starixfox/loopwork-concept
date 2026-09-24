import { useEffect, type RefObject } from 'react'

interface ScrollVideoOptions {
  /** Fraction of the page (0–1) over which the video is scrubbed. */
  endProgress?: number
  /** Lerp factor — how quickly the playhead eases toward the scroll target. */
  lerp?: number
  /** Disable scrubbing entirely (mobile / reduced motion). */
  enabled?: boolean
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

/**
 * Maps window.scrollY → video.currentTime with linear interpolation:
 *   currentFrame += (targetFrame - currentFrame) * lerp
 *
 * The video element is kept paused at all times — playback position is
 * driven purely by scroll. All listeners/rAF loops are cleaned up on unmount.
 */
export function useScrollVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  { endProgress = 0.85, lerp = 0.1, enabled = true }: ScrollVideoOptions = {},
) {
  useEffect(() => {
    const video = videoRef.current
    if (!video || !enabled) return

    let rafId = 0
    let targetTime = 0
    let needsSeek = false
    // Sub-frame seek accumulator — avoids browser seek-thrashing on devices
    // whose currentTime granularity is coarser than our scrub resolution.
    let lastSeek = -1

    const getDuration = () => {
      const d = video.duration
      return Number.isFinite(d) && d > 0 ? d : 0
    }

    const computeTarget = () => {
      const duration = getDuration()
      if (!duration) return
      const doc = document.documentElement
      const maxScroll = Math.max(
        1,
        (doc.scrollHeight || 0) - window.innerHeight,
      )
      const progress = clamp(window.scrollY / maxScroll, 0, 1)
      // Map the first `endProgress` portion of the page to the full video.
      const t = clamp(progress / endProgress, 0, 1)
      targetTime = t * duration
    }

    const tick = () => {
      const duration = getDuration()
      if (duration > 0) {
        const current = video.currentTime
        // Smoothly ease the playhead toward the scroll-derived target.
        const next = current + (targetTime - current) * lerp
        const settled = Math.abs(targetTime - next) < 0.002
        const value = settled ? targetTime : next

        if (settled) needsSeek = false

        if (needsSeek && Math.abs(value - lastSeek) > 0.015) {
          try {
            video.currentTime = value
          } catch {
            /* metadata not ready yet — retry next frame */
          }
          lastSeek = value
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      needsSeek = true
      computeTarget()
    }

    const onLoadedMetadata = () => {
      // Keep the element permanently paused; scroll drives the playhead.
      video.pause()
      computeTarget()
      try {
        video.currentTime = targetTime
        lastSeek = targetTime
      } catch {
        /* ignore */
      }
      needsSeek = true
    }

    // Safety net: if the cached video reports a ready state already, sync now.
    if (video.readyState >= 1) onLoadedMetadata()

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    computeTarget()
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [videoRef, endProgress, lerp, enabled])
}
