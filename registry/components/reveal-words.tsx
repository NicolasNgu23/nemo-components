import { useRef } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { revealDelay } from '@/lib/reveal-delay'

type RevealWordsProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  id?: string
  className?: string
  delay?: number
}

// Chaque mot monte de sous sa ligne, l'un après l'autre, quand le texte entre à l'écran. Un retour à la
// ligne dans le texte en commence une nouvelle.
export function RevealWords({ text, as: Tag = 'p', id, className, delay = 0 }: RevealWordsProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, 0.3)
  const lines = text.split('\n').map((line) => line.split(' '))
  let wordIndex = 0

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((words, lineIndex) => (
        <span key={lineIndex} className={lines.length > 1 ? 'block' : undefined}>
          {words.map((word, index) => {
            const order = wordIndex++
            return (
              <span key={`${word}-${index}`}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span
                    className={`inline-block transition-[translate,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 ${
                      isInView ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
                    }`}
                    style={{ transitionDelay: `${delay + revealDelay(order)}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {index < words.length - 1 && ' '}
              </span>
            )
          })}
          {lineIndex < lines.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
