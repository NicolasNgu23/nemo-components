import { useEffect, useRef } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { elasticOut, toLinearEasing } from '@/lib/elastic'
import { shuffledOrder } from '@/lib/shuffled-order'

type RisingWordmarkProps = {
  text: string
  dotClassName?: string
  className?: string
}

const bounceEasing = toLinearEasing(elasticOut, 60)

// Survolée, une lettre se réduit presque à rien puis revient en rebondissant (elastic.out(1, 0.8) de GSAP).
function bounce(letter: HTMLElement) {
  if (letter.getAnimations().length > 0) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  letter.animate(
    [
      { scale: 1, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' },
      { scale: 0.05, offset: 0.25, easing: bounceEasing },
      { scale: 1 },
    ],
    { duration: 2400 },
  )
}

// Un mot sur toute la largeur. À chaque arrivée à l'écran, ses lettres montent dans un ordre tiré au hasard,
// puis le point final apparaît en grossissant.
export function RisingWordmark({ text, dotClassName = 'text-blue-600', className = '' }: RisingWordmarkProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, 0.05, true)
  const letters = [...`${text}.`]
  const lastIndex = letters.length - 1

  // L'ordre est tiré dans le navigateur seulement, pour que le HTML rendu côté serveur n'en dépende pas.
  useEffect(() => {
    if (isInView) return
    const ranks = shuffledOrder(lastIndex, Math.random)
    ref.current?.querySelectorAll<HTMLElement>('[data-rise]').forEach((letter, index) => {
      letter.style.transitionDelay = `${200 + ranks[index]! * 30}ms`
    })
  }, [isInView, lastIndex])

  return (
    <div className="@container">
      <p
        ref={ref}
        aria-hidden="true"
        className={`flex justify-between overflow-hidden text-[16.4cqw] leading-[0.8] font-semibold tracking-[-0.07em] select-none ${className}`}
      >
        {letters.map((letter, index) => {
          const isDot = index === lastIndex
          return (
            <span key={index} className="inline-block" onPointerEnter={(event) => bounce(event.currentTarget)}>
              <span
                className={`inline-block motion-reduce:translate-y-0 motion-reduce:scale-100 ${
                  isDot
                    ? `origin-center transition-[scale] duration-[600ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] ${dotClassName}`
                    : 'transition-[translate] duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]'
                } ${isInView ? 'translate-y-0 scale-100' : isDot ? 'scale-0' : 'translate-y-[120%]'}`}
                data-rise={isDot ? undefined : ''}
                style={{ transitionDelay: `${isDot ? 1200 : 200 + index * 30}ms` }}
              >
                {letter === ' ' ? ' ' : letter}
              </span>
            </span>
          )
        })}
      </p>
      <span className="sr-only">{text}</span>
    </div>
  )
}
