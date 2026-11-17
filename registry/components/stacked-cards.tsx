import { useEffect, useRef } from 'react'

import { stackScale } from '@/lib/stack-scale'

export type StackedCard = { title: string; text: string }

type StackedCardsProps = {
  items: StackedCard[]
  stepLabel?: string
  stickyTopRem?: number
  stickyStepRem?: number
  className?: string
  cardClassName?: string
}

const pad = (value: number) => String(value).padStart(2, '0')

// Chaque carte se colle un peu plus bas que la précédente, et celle qu'elle recouvre rétrécit d'un cran.
export function StackedCards({
  items,
  stepLabel = 'Étape',
  stickyTopRem = 6,
  stickyStepRem = 1.25,
  className = '',
  cardClassName = 'border border-black/10 bg-white',
}: StackedCardsProps) {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-stacked-card]'))
    let frame = 0
    const update = () => {
      frame = 0
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
      const gaps = cards.map(
        (card, index) => card.getBoundingClientRect().top - (stickyTopRem + index * stickyStepRem) * rem,
      )
      cards.forEach((card, index) => {
        card.style.scale = String(stackScale(gaps.slice(index + 1), card.offsetHeight))
      })
    }
    const onScroll = () => {
      frame ||= requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [stickyTopRem, stickyStepRem])

  return (
    <ol ref={listRef} className={`flex flex-col gap-6 ${className}`}>
      {items.map((item, index) => (
        <li
          key={item.title}
          data-stacked-card
          style={{ top: `${stickyTopRem + index * stickyStepRem}rem` }}
          className={`group sticky origin-top rounded-3xl p-7 md:min-h-[16rem] md:p-11 ${cardClassName}`}
        >
          <div className="flex items-start justify-between gap-6">
            <span className="text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-light tracking-[-0.04em] tabular-nums transition-colors duration-300 group-hover:text-blue-600">
              {pad(index + 1)}
            </span>
            <span
              role="img"
              aria-label={`${stepLabel} ${index + 1} / ${items.length}`}
              className="mt-3 flex gap-1.5"
            >
              {items.map((other, otherIndex) => (
                <span
                  key={other.title}
                  className={`h-0.5 w-5 rounded-full bg-current ${otherIndex <= index ? '' : 'opacity-15'}`}
                />
              ))}
            </span>
          </div>
          <div className="mt-6 md:mt-4 md:ml-[30%] md:max-w-[560px]">
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-medium tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className="mt-3 opacity-60">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
