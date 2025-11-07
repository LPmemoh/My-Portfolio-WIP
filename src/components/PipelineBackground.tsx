import { useEffect, useRef } from 'react'

/**
 * Canvas-based pipeline background effect.
 * Pipes spawn across the hero, animate for ~8s, then retrace their paths to erase themselves.
 */
export default function PipelineBackground() {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const pipeCount = 80
    const pipePropCount = 8
    const pipePropsLength = pipeCount * pipePropCount
    const turnCount = 8
    const TO_RAD = Math.PI / 180
    const HALF_PI = Math.PI / 2
    const TAU = Math.PI * 2
    const turnAmount = (360 / turnCount) * TO_RAD
    const turnChanceRange = 58
    const baseSpeed = 0.5
    const rangeSpeed = 1
    const baseWidth = 2
    const rangeWidth = 4
    const baseHue = 240
    const rangeHue = 60
    const backgroundColor = 'hsl(225, 70%, 6%)'
    const effectDurationMs = Infinity
    const baseFrameRate = 60
    const effectDurationFrames = Infinity
    const targetFps = 30
    const frameInterval = 1000 / targetFps
    const lifeStep = baseFrameRate / targetFps
    const maxTrailLength = 600
    const blurStrength = 6
    const maxPixelRatio = 1.5
    const resolutionScale = 0.85

    const rand = (n: number) => Math.random() * n
    const fadeInOut = (life: number, ttl: number) => {
      if (ttl <= 0) return 0
      if (!Number.isFinite(ttl)) {
        const fadeInFrames = baseFrameRate * 1.5 // ~1.5s fade for infinite pipes
        return Math.min(1, life / fadeInFrames)
      }
      const fadeInFrames = Math.max(1, ttl * 0.2)
      if (life <= fadeInFrames) {
        return life / fadeInFrames
      }
      return 1
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const container = hostRef.current
    if (!container) return

    const canvasA = document.createElement('canvas')
    const canvasB = document.createElement('canvas')
    const ctxA = canvasA.getContext('2d')
    const ctxB = canvasB.getContext('2d')

    if (!ctxA || !ctxB) {
      return
    }

    canvasB.style.position = 'absolute'
    canvasB.style.top = '0'
    canvasB.style.left = '0'
    canvasB.style.width = '100%'
    canvasB.style.height = '100%'
    canvasB.style.pointerEvents = 'none'

    container.appendChild(canvasB)

    const canvas = { a: canvasA, b: canvasB }
    const ctx = { a: ctxA, b: ctxB }
    const pipeProps = new Float32Array(pipePropsLength)
    const pipeHistories = Array.from({ length: pipeCount }, () => [] as number[])
    const pipeLifeSamples = Array.from({ length: pipeCount }, () => [] as number[])
    const pipeSpawnTimes = new Float64Array(pipeCount)
    const eraserQueue: Array<{ path: number[]; lifeSamples: number[]; startIndex: number; width: number; hue: number }> = []
    let tick = 0
    let frameId = 0
    let lastFrameTime = 0
    let viewWidth = 0
    let viewHeight = 0
    let pixelRatio = 1
    let isVisible = document.visibilityState !== 'hidden'

    const resize = () => {
      const bounds = container.getBoundingClientRect()
      const width = Math.floor(bounds.width)
      const height = Math.floor(bounds.height)

      if (width === 0 || height === 0) {
        return
      }

      const deviceRatio = window.devicePixelRatio || 1
      pixelRatio = Math.min(deviceRatio, maxPixelRatio) * resolutionScale
      viewWidth = width
      viewHeight = height
      const scaledWidth = Math.max(1, Math.floor(width * pixelRatio))
      const scaledHeight = Math.max(1, Math.floor(height * pixelRatio))

      canvas.a.width = scaledWidth
      canvas.a.height = scaledHeight
      canvas.b.width = scaledWidth
      canvas.b.height = scaledHeight

      ctx.a.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.a.clearRect(0, 0, width, height)
      ctx.b.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.b.clearRect(0, 0, width, height)
    }

    const initPipe = (i: number, now: number) => {
      const pipeIndex = Math.floor(i / pipePropCount)
      const drawWidth = Math.max(1, viewWidth)
      const drawHeight = Math.max(1, viewHeight)
      const x = rand(drawWidth)
      const y = rand(drawHeight)
      const direction = Math.round(rand(1)) ? HALF_PI : TAU - HALF_PI
      const speed = baseSpeed + rand(rangeSpeed)
      const life = 0
      const ttl = effectDurationFrames
      const widthValue = baseWidth + rand(rangeWidth)
      const hue = baseHue + rand(rangeHue)

      pipeProps.set([x, y, direction, speed, life, ttl, widthValue, hue], i)
      pipeHistories[pipeIndex] = [x, y]
      pipeLifeSamples[pipeIndex] = [life]
      pipeSpawnTimes[pipeIndex] = now
    }

    const initPipes = () => {
      const now = performance.now()
      eraserQueue.length = 0
      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        initPipe(i, now)
      }
    }

    const wrapBounds = (i: number) => {
      const width = viewWidth
      const height = viewHeight
      const xIndex = i
      const yIndex = i + 1

      if (pipeProps[xIndex] > width) pipeProps[xIndex] = 0
      if (pipeProps[xIndex] < 0) pipeProps[xIndex] = width
      if (pipeProps[yIndex] > height) pipeProps[yIndex] = 0
      if (pipeProps[yIndex] < 0) pipeProps[yIndex] = height
    }

    const drawPipe = (x: number, y: number, life: number, ttl: number, width: number, hue: number) => {
      if (ttl <= 0) return
      ctx.a.save()
      ctx.a.strokeStyle = `hsla(${hue},75%,50%,${fadeInOut(life, ttl) * 0.125})`
      ctx.a.beginPath()
      ctx.a.arc(x, y, width, 0, TAU)
      ctx.a.stroke()
      ctx.a.closePath()
      ctx.a.restore()
    }

    const updatePipe = (i: number, now: number) => {
      const xIndex = i
      const yIndex = i + 1
      const directionIndex = i + 2
      const speedIndex = i + 3
      const lifeIndex = i + 4
      const widthIndex = i + 6
      const hueIndex = i + 7
      const pipeIndex = Math.floor(i / pipePropCount)

      const width = pipeProps[widthIndex]
      const hue = pipeProps[hueIndex]

      let x = pipeProps[xIndex]
      let y = pipeProps[yIndex]
      let direction = pipeProps[directionIndex]
      const speed = pipeProps[speedIndex]
      let life = pipeProps[lifeIndex]

      const path = pipeHistories[pipeIndex]
      const lifeSamples = pipeLifeSamples[pipeIndex]
      const lifeSnapshot = life
      if (path.length === 0) {
        path.push(x, y)
        lifeSamples.push(lifeSnapshot)
      }

      const divisor = Math.max(1, Math.round(rand(turnChanceRange)))
      const turnChance = tick % divisor === 0 && (Math.round(x) % 6 === 0 || Math.round(y) % 6 === 0)
      const turnBias = Math.round(rand(1)) ? -1 : 1
      direction += turnChance ? turnAmount * turnBias : 0

      x += Math.cos(direction) * speed
      y += Math.sin(direction) * speed

      pipeProps[xIndex] = x
      pipeProps[yIndex] = y
      pipeProps[directionIndex] = direction

      wrapBounds(i)

      const wrappedX = pipeProps[xIndex]
      const wrappedY = pipeProps[yIndex]
      path.push(wrappedX, wrappedY)
      lifeSamples.push(lifeSnapshot)
      if (path.length > maxTrailLength) {
        const excess = path.length - maxTrailLength
        path.splice(0, excess)
        const lifeExcess = Math.ceil(excess / 2)
        lifeSamples.splice(0, lifeExcess)
      }

      life += lifeStep
      pipeProps[lifeIndex] = life

      if (Number.isFinite(effectDurationMs) && now - pipeSpawnTimes[pipeIndex] >= effectDurationMs) {
        eraserQueue.push({
          path,
          lifeSamples,
          startIndex: 0,
          width,
          hue,
        })
        pipeHistories[pipeIndex] = []
        pipeLifeSamples[pipeIndex] = []
        initPipe(i, now)
      }
    }

    const updatePipes = (now: number) => {
      tick += 1
      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        updatePipe(i, now)
      }
    }

    const advanceErasers = () => {
      for (let i = eraserQueue.length - 1; i >= 0; i--) {
        const entry = eraserQueue[i]
        entry.startIndex = Math.min(entry.path.length, entry.startIndex + 4)
        if (entry.startIndex >= entry.path.length) {
          eraserQueue.splice(i, 1)
          entry.path.length = 0
          entry.lifeSamples.length = 0
        }
      }
    }

    const drawPathSegment = (path: number[], lifeSamples: number[], startIndex: number, width: number, hue: number) => {
      if (path.length - startIndex < 2) {
        return
      }

      let sampleIndex = Math.floor(startIndex / 2)
      for (let idx = startIndex; idx < path.length; idx += 2, sampleIndex++) {
        const x = path[idx]
        const y = path[idx + 1]
        const lifeSample = lifeSamples[sampleIndex] ?? 0
        drawPipe(x, y, lifeSample, effectDurationFrames, width, hue)
      }
    }

    const render = () => {
      ctx.a.save()
      ctx.a.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.a.clearRect(0, 0, viewWidth, viewHeight)
      ctx.a.restore()

      for (let pipeIndex = 0; pipeIndex < pipeCount; pipeIndex++) {
        const path = pipeHistories[pipeIndex]
        if (path.length < 2) continue
        const lifeSamples = pipeLifeSamples[pipeIndex]
        const base = pipeIndex * pipePropCount
        const width = pipeProps[base + 6]
        const hue = pipeProps[base + 7]
        drawPathSegment(path, lifeSamples, 0, width, hue)
      }

      for (const entry of eraserQueue) {
        drawPathSegment(entry.path, entry.lifeSamples, entry.startIndex, entry.width, entry.hue)
      }

      ctx.b.save()
      ctx.b.fillStyle = backgroundColor
      ctx.b.fillRect(0, 0, viewWidth, viewHeight)
      ctx.b.restore()

      ctx.b.save()
      ctx.b.filter = `blur(${blurStrength}px)`
      ctx.b.globalAlpha = 0.9
      ctx.b.drawImage(canvas.a, 0, 0, viewWidth, viewHeight)
      ctx.b.restore()
    }

    const draw = (now: number) => {
      if (!isVisible) {
        frameId = window.requestAnimationFrame(draw)
        return
      }

      if (now - lastFrameTime >= frameInterval) {
        lastFrameTime = now
        updatePipes(now)
        advanceErasers()
        render()
      }

      frameId = window.requestAnimationFrame(draw)
    }

    const handleWindowResize = () => {
      resize()
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resize()
          })
        : null

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden'
      if (isVisible) {
        lastFrameTime = 0
      }
    }

    resize()
    initPipes()
    frameId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', handleWindowResize)
    resizeObserver?.observe(container)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleWindowResize)
      resizeObserver?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)
      ctx.b.clearRect(0, 0, canvas.b.width, canvas.b.height)
      if (canvas.b.parentElement === container) {
        container.removeChild(canvas.b)
      }
    }
  }, [])

  return <div ref={hostRef} className="content--canvas pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
}
