declare module 'canvas-confetti' {
  export type Origin = { x?: number; y?: number }
  export type Options = {
    particleCount?: number
    angle?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    drift?: number
    ticks?: number
    origin?: Origin
    colors?: string[]
    shapes?: Array<'square' | 'circle'>
    scalar?: number
    zIndex?: number
    disableForReducedMotion?: boolean
  }

  type Confetti = (options?: Options) => Promise<null> | null

  const confetti: Confetti
  export default confetti
}
