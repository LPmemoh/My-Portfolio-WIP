import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

type IntroRevealProps = {
  onComplete?: () => void
  fullName?: { left: string; right: string }
}

export function IntroReveal({
  onComplete,
  fullName = { left: 'Liam', right: 'Prsa' },
}: IntroRevealProps) {
  const leftControls = useAnimation()
  const rightControls = useAnimation()
  const bgControls = useAnimation()
  const originalOverflow = useRef<string | null>(null)

  useEffect(() => {
    const { body } = document
    if (!body) return

    if (originalOverflow.current === null) {
      originalOverflow.current = body.style.overflow || ''
    }

    body.style.overflow = 'hidden'
    let isActive = true

    const run = async () => {
      // panels slide away; background fades to transparent
      await Promise.all([
        leftControls.start({
          x: '-100%',
          transition: { delay: 1, duration: 2.0, ease: [0.3, 1, 0.36, 1] },
        }),
        rightControls.start({
          x: '100%',
          transition: { delay: 1, duration: 2.0, ease: [0.3, 1, 0.36, 1] },
        }),
        bgControls.start({
          backgroundColor: 'rgba(2,6,23,0)',
          transition: { delay: 1.75, duration: 0.6, ease: 'easeOut' },
        }),
      ])
      if (!isActive) return
      onComplete?.()
      body.style.overflow = originalOverflow.current ?? ''
    }
    run()

    return () => {
      isActive = false
      if (body) {
        body.style.overflow = originalOverflow.current ?? ''
      }
    }
  }, [leftControls, rightControls, bgControls, onComplete])

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden>
      <motion.div
        initial={{ backgroundColor: 'rgb(2,6,23)' }} // slate-950
        animate={bgControls}
        className="absolute inset-0"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={leftControls}
        className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-end pr-6"
      >
        <span className="text-[12vw] leading-none font-extrabold tracking-tight text-white mix-blend-difference select-none">
          {fullName.left}
        </span>
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={rightControls}
        className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-start pl-6"
      >
        <span className="text-[12vw] leading-none font-extrabold tracking-tight text-white mix-blend-difference select-none">
          {fullName.right}
        </span>
      </motion.div>
    </div>
  )
}
