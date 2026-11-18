import { ArrowUpRightIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

import { accordionProgress, accordionStyle } from '@/lib/accordion-progress'

export type AccordionItem = {
  title: string
  text: string
  href?: string
  linkLabel?: string
  visual?: ReactNode
}

type ScrollAccordionProps = {
  items: readonly AccordionItem[]
  idleColor?: string
  activeColor?: string
  idleTextColor?: string
  activeTextColor?: string
  className?: string
}

const pad = (value: number) => String(value).padStart(2, '0')

// Des services en cartes qui s'ouvrent une à une au défilement : chaque carte grandit, passe du clair au foncé et
// dévoile son texte, au rythme exact de sa remontée dans l'écran. La première est toujours ouverte.
export function ScrollAccordion({
  items,
  idleColor = '#eeeeee',
  activeColor = '#0b0b0d',
  idleTextColor = '#0b0b0d',
  activeTextColor = '#ffffff',
  className = '',
}: ScrollAccordionProps) {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-accordion-card]'))
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mix = (from: string, to: string, amount: number) =>
      `color-mix(in srgb, ${to} ${(amount * 100).toFixed(2)}%, ${from})`

    let frame = 0
    const update = () => {
      frame = 0
      const viewportHeight = window.innerHeight
      cards.forEach((card, index) => {
        const progress =
          index === 0 || isReduced
            ? 1
            : accordionProgress(card.getBoundingClientRect().top, viewportHeight)
        const style = accordionStyle(progress)
        const panel = card.querySelector<HTMLElement>('[data-panel]')
        const inner = card.querySelector<HTMLElement>('[data-panel-inner]')
        card.style.backgroundColor = mix(idleColor, activeColor, style.colorMix)
        card.style.color = mix(idleTextColor, activeTextColor, style.colorMix)
        card
          .querySelector<HTMLElement>('[data-number]')
          ?.style.setProperty('opacity', String(style.numberOpacity))
        card
          .querySelector<HTMLElement>('[data-visual]')
          ?.style.setProperty('opacity', String(style.imageOpacity))
        if (panel && inner) {
          panel.style.height = `${style.open * inner.scrollHeight}px`
          inner.style.opacity = String(style.contentOpacity)
        }
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
  }, [idleColor, activeColor, idleTextColor, activeTextColor])

  return (
    <ol ref={listRef} className={`grid gap-4 ${className}`}>
      {items.map((item, index) => {
        const isFirst = index === 0
        return (
          <li
            key={item.title}
            data-accordion-card
            className="relative overflow-hidden rounded-[20px] p-[30px] md:p-[60px]"
            style={{
              backgroundColor: isFirst ? activeColor : idleColor,
              color: isFirst ? activeTextColor : idleTextColor,
            }}
          >
            {item.visual && (
              <div
                data-visual
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 left-0 md:left-auto md:w-[600px]"
                style={{ opacity: isFirst ? 1 : 0 }}
              >
                {item.visual}
              </div>
            )}
            <div className="relative grid gap-4 md:flex md:flex-row-reverse md:items-center md:justify-between">
              <span
                data-number
                className="text-xl leading-[1.1] tabular-nums md:text-right md:text-[26px]"
                style={{ opacity: isFirst ? 0.5 : 0.2 }}
              >
                {pad(index + 1)}
              </span>
              <h3 className="text-[32px] leading-[1.1] md:text-[42px]">{item.title}</h3>
            </div>
            <div
              data-panel
              className="relative overflow-hidden"
              style={isFirst ? undefined : { height: 0 }}
            >
              <div data-panel-inner style={{ opacity: isFirst ? 1 : 0 }}>
                <div className="pt-6 md:max-w-[504px] md:pt-[30px]">
                  <p className="text-base leading-[1.6] md:text-lg">{item.text}</p>
                  {item.href && (
                    <a
                      href={item.href}
                      className="group mt-6 inline-flex items-center gap-3 md:mt-[30px]"
                    >
                      {item.linkLabel ?? 'Découvrir'}
                      <span className="grid size-9 place-items-center rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                        <ArrowUpRightIcon className="size-4" style={{ color: activeColor }} />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
