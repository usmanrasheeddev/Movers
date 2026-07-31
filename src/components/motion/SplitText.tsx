import { cn } from '@/lib/utils'

type SplitTextProps = {
  text: string
  className?: string
  charClassName?: string
}

export function SplitText({ text, className, charClassName }: SplitTextProps) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, cIdx) => (
            <span
              key={`${char}-${cIdx}`}
              aria-hidden
              className={cn('inline-block', charClassName)}
            >
              {char}
            </span>
          ))}
          {/* Add a non-breaking space after each word except the last to allow proper wrapping */}
          {wIdx < words.length - 1 && (
            <span aria-hidden className="inline-block">
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </span>
  )
}
