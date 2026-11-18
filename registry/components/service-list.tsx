import { ArrowUpRightIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'

import { accordionProgress, accordionStyle } from '@/lib/accordion-progress'
import { fillOrigin } from '@/lib/fill-origin'

export type ServiceItem = { title: string; text: string; tags?: readonly string[]; href?: string }

type ServiceListProps = {
  items: readonly ServiceItem[]
  fillColor?: string
  fillDuration?: number
  reveal?: 'rise' | 'accordion'
  className?: string
}

const ease = 'ease-[cubic-bezier(0.22,1,0.36,1)]'
const grid =
  'grid items-center gap-x-8 gap-y-4 px-4 py-9 md:grid-cols-[80px_calc(50%-104px)_minmax(0,1fr)_auto]'

function RowContent({
  item,
  index,
  isOn,
  isCollapsed,
}: {
  item: ServiceItem
  index: number
  isOn: boolean
  isCollapsed: boolean
}) {
  return (
    <>
      <span className="text-sm tabular-nums opacity-50">{String(index + 1).padStart(2, '0')}</span>
      <h3
        className={`text-[clamp(28px,3.2vw,52px)] leading-[1.05] font-normal tracking-[-0.03em] transition-transform duration-[600ms] motion-reduce:transition-none ${ease} ${
          isOn ? '[transform:translateX(16px)]' : ''
        }`}
      >
        {item.title}
      </h3>
      <div data-panel className="overflow-hidden" style={isCollapsed ? { height: 0 } : undefined}>
        <div data-panel-inner style={isCollapsed ? { opacity: 0 } : undefined}>
          <p
            className={`text-[15px] leading-[1.65] transition-opacity duration-[400ms] ${isOn ? 'opacity-75' : 'opacity-50'}`}
          >
            {item.text}
          </p>
          {item.tags && (
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors duration-[400ms] ${
                    isOn ? 'border-current/40' : 'border-current/15'
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <span
        aria-hidden="true"
        className={`hidden size-14 items-center justify-center rounded-full border transition-[transform,border-color] duration-[600ms] motion-reduce:transition-none md:flex ${ease} ${
          isOn ? '[transform:rotate(45deg)] border-current' : 'border-current/15'
        }`}
      >
        <ArrowUpRightIcon className="size-4" />
      </span>
    </>
  )
}

function ServiceRow({
  item,
  index,
  fillColor,
  fillDuration,
  reveal,
}: {
  item: ServiceItem
  index: number
  fillColor: string
  fillDuration: number
  reveal: 'rise' | 'accordion'
}) {
  const ref = useRef<HTMLLIElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [isOn, setIsOn] = useState(false)

  // « rise » : la ligne monte de 40 px en apparaissant, entre son entrée dans l'écran et 60 % de cette entrée
  // (mowa.studio). Sans ViewTimeline (Firefox, Safari ancien), la ligne est simplement visible.
  useEffect(() => {
    const row = ref.current
    if (reveal !== 'rise' || !row || !('ViewTimeline' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ViewTimelineClass = (
      window as unknown as {
        ViewTimeline: new (options: { subject: Element }) => AnimationTimeline
      }
    ).ViewTimeline
    const animation = row.animate(
      [
        { opacity: 0, transform: 'translateY(40px)' },
        { opacity: 1, transform: 'none' },
      ],
      {
        fill: 'both',
        timeline: new ViewTimelineClass({ subject: row }),
        rangeStart: 'entry 0%',
        rangeEnd: 'entry 60%',
      } as KeyframeAnimationOptions,
    )
    return () => animation.cancel()
  }, [reveal])

  // « accordion » : la description et les étiquettes se déplient au défilement comme les cartes de cuberto.com,
  // dans la ligne et dans sa copie claire, pour que les deux gardent la même hauteur.
  useEffect(() => {
    const row = ref.current
    if (reveal !== 'accordion' || !row) return
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const panels = Array.from(row.querySelectorAll<HTMLElement>('[data-panel]'))
    let frame = 0
    const update = () => {
      frame = 0
      const progress = isReduced
        ? 1
        : accordionProgress(row.getBoundingClientRect().top, window.innerHeight)
      const { open, contentOpacity } = accordionStyle(progress)
      panels.forEach((panel) => {
        const inner = panel.firstElementChild as HTMLElement | null
        if (!inner) return
        panel.style.height = open >= 1 ? '' : `${open * inner.scrollHeight}px`
        inner.style.opacity = String(contentOpacity)
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
  }, [reveal])

  const placeFill = (event: PointerEvent<HTMLElement>) => {
    const row = ref.current
    const fill = fillRef.current
    if (!row || !fill) return
    const { x, y, radius } = fillOrigin(
      { x: event.clientX, y: event.clientY },
      row.getBoundingClientRect(),
    )
    // Le centre saute au pointeur sans transition, comme le disque mis à l'échelle de Mowa : sinon le navigateur
    // ferait glisser le cercle depuis l'ancien centre et il paraîtrait partir du milieu de la ligne.
    fill.style.transitionProperty = 'none'
    row.style.setProperty('--x', `${x}px`)
    row.style.setProperty('--y', `${y}px`)
    row.style.setProperty('--r', `${radius}px`)
    void getComputedStyle(fill).clipPath
    fill.style.transitionProperty = ''
  }

  const Tag = item.href ? 'a' : 'div'

  return (
    <li ref={ref}>
      <Tag
        {...(item.href ? { href: item.href } : {})}
        onPointerEnter={(event: PointerEvent<HTMLElement>) => {
          placeFill(event)
          setIsOn(true)
        }}
        onPointerLeave={(event: PointerEvent<HTMLElement>) => {
          placeFill(event)
          setIsOn(false)
        }}
        className={`relative overflow-hidden border-t border-current/15 ${grid}`}
      >
        <RowContent item={item} index={index} isOn={isOn} isCollapsed={reveal === 'accordion'} />
        {/* Une copie claire du contenu, découpée par le disque : le texte reste lisible dedans comme dehors, même
            sur fond clair, où un simple changement de couleur le ferait disparaître le temps que le disque passe. */}
        <div
          ref={fillRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 text-white transition-[clip-path] motion-reduce:transition-none ${ease} ${grid} ${
            isOn
              ? '[clip-path:circle(var(--r,1400px)_at_var(--x,50%)_var(--y,50%))]'
              : '[clip-path:circle(0px_at_var(--x,50%)_var(--y,50%))]'
          }`}
          style={{ backgroundColor: fillColor, transitionDuration: `${fillDuration}ms` }}
        >
          <RowContent item={item} index={index} isOn={isOn} isCollapsed={reveal === 'accordion'} />
        </div>
      </Tag>
    </li>
  )
}

// Une liste de services : au survol, un disque de couleur grandit depuis le point d'entrée du pointeur puis se
// rétracte vers son point de sortie. Au défilement, chaque ligne monte (« rise ») ou se déplie (« accordion »).
export function ServiceList({
  items,
  fillColor = '#1735f9',
  fillDuration = 750,
  reveal = 'rise',
  className = '',
}: ServiceListProps) {
  return (
    <ul className={`border-b border-current/15 ${className}`}>
      {items.map((item, index) => (
        <ServiceRow
          key={item.title}
          item={item}
          index={index}
          fillColor={fillColor}
          fillDuration={fillDuration}
          reveal={reveal}
        />
      ))}
    </ul>
  )
}
