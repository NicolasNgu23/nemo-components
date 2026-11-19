import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cardOffset, snapPosition } from '@/lib/carousel-ring'

export type CurvedCarouselItem = {
  title: string
  description: string
  badge?: string
  tag?: string
  href?: string
  cta?: string
  visual: ReactNode
  thumbnail?: ReactNode
  tone: string
}

type CurvedCarouselProps = {
  items: readonly CurvedCarouselItem[]
  label?: string
  className?: string
}

const stepDeg = 40
// La carte active avance vers la caméra pour passer devant ses voisines, qui restent sur le cylindre.
const activeLiftCqw = 22
const settle = 'duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]'

type Drag = { x: number; start: number; lastX: number; lastT: number; velocity: number }

// Les cartes sont posées sur l'intérieur d'un cylindre, la caméra au centre : celles des côtés se
// rapprochent et grossissent vers les bords de l'écran.
export function CurvedCarousel({
  items,
  label = 'Projets à la une',
  className,
}: CurvedCarouselProps) {
  const count = items.length
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const drag = useRef<Drag | null>(null)
  const stage = useRef<HTMLDivElement>(null)
  const active = ((Math.round(position) % count) + count) % count
  const current = items[active]!

  const goTo = (index: number) =>
    setPosition((p) => Math.round(p) + cardOffset(index, Math.round(p), count))
  const step = (direction: 1 | -1) => setPosition((p) => Math.round(p) + direction)

  const cardsPerPixel = () => 2 / (stage.current?.clientWidth ?? 1000)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = {
      x: event.clientX,
      start: Math.round(position),
      lastX: event.clientX,
      lastT: event.timeStamp,
      velocity: 0,
    }
    setIsDragging(true)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    const dt = Math.max(event.timeStamp - d.lastT, 1)
    d.velocity = ((d.lastX - event.clientX) * cardsPerPixel() * 1000) / dt
    d.lastX = event.clientX
    d.lastT = event.timeStamp
    setPosition(d.start + (d.x - event.clientX) * cardsPerPixel())
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    drag.current = null
    setIsDragging(false)
    setPosition(snapPosition(d.start, (d.x - event.clientX) * cardsPerPixel(), d.velocity))
  }

  return (
    <section
      aria-roledescription="carrousel"
      aria-label={label}
      className="relative isolate h-[clamp(34rem,62.5vw,56rem)] overflow-hidden text-white transition-colors duration-700"
      style={{ backgroundColor: current.tone }}
    >
      <style href="curved-carousel" precedence="default">
        {
          '@keyframes curved-carousel-in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}'
        }
      </style>
      <div
        className={`absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_100%,rgb(255_255_255/0.18),transparent_60%)] ${className ?? ''}`}
      />
      <div
        ref={stage}
        className={`absolute inset-0 touch-pan-y select-none [container-type:size] [perspective:70cqw] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateZ(-3deg)_translateZ(62cqw)]">
          {items.map((item, index) => {
            const offset = cardOffset(index, position, count)
            const isVisible = Math.abs(offset) <= 1.5
            const style = {
              transform: `rotateY(${-offset * stepDeg}deg) translateZ(${-70 + Math.max(0, 1 - Math.abs(offset)) * activeLiftCqw}cqw)`,
              opacity: isVisible ? 1 : 0,
            } as CSSProperties
            return (
              <div
                key={item.title}
                aria-hidden={index !== active}
                className={`absolute top-[14%] left-[17%] aspect-[1.6] w-[66%] overflow-hidden rounded-[2px] shadow-[0_30px_80px_rgb(0_0_0/0.35)] [backface-visibility:hidden] *:pointer-events-none *:size-full *:object-cover motion-reduce:transition-none ${
                  isDragging
                    ? 'transition-[opacity] duration-300'
                    : `transition-[transform,opacity] ${settle}`
                }`}
                style={style}
              >
                {item.visual}
              </div>
            )
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 px-[clamp(1.5rem,10vw,9.5rem)] pb-[clamp(2rem,4vw,3.5rem)] max-md:pb-24">
        <div
          key={active}
          aria-live="polite"
          className="pointer-events-auto max-w-[min(30rem,80%)] animate-[curved-carousel-in_600ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none"
        >
          {(current.badge || current.tag) && (
            <p className="flex items-center gap-3 text-sm">
              {current.badge && (
                <span className="font-bold whitespace-nowrap uppercase">{current.badge}</span>
              )}
              {current.tag && (
                <span className="rounded-[4px] bg-white/20 px-2 py-1 text-[11px] tracking-[0.12em] uppercase">
                  {current.tag}
                </span>
              )}
            </p>
          )}
          <h2 className="mt-3 text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase">
            {current.title}
          </h2>
          <p className="mt-4 text-[13px] leading-[1.35] uppercase">{current.description}</p>
          {current.href && (
            <a
              href={current.href}
              className="mt-6 inline-flex h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-white px-8 md:px-14 text-[13px] tracking-[0.1em] text-black uppercase transition-transform duration-150 active:scale-[0.97]"
            >
              {current.cta ?? 'Découvrir'}
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </a>
          )}
        </div>
        <div className="pointer-events-auto flex flex-col items-end gap-4 max-md:hidden">
          <div className="flex gap-3">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Voir ${item.title}`}
                aria-current={index === active}
                onClick={() => goTo(index)}
                className={`relative size-12 cursor-pointer overflow-hidden rounded-[8px] border-2 transition-[border-color,opacity] duration-300 *:size-full *:object-cover ${
                  index === active
                    ? 'border-white'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                {item.thumbnail ?? item.visual}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-[clamp(1rem,2.5vw,2.25rem)] max-md:bottom-8 max-md:flex-row-reverse md:top-1/2 flex md:-translate-y-1/2 flex-col gap-4">
        {(
          [
            ['Projet suivant', 1, ChevronRightIcon],
            ['Projet précédent', -1, ChevronLeftIcon],
          ] as const
        ).map(([name, direction, Icon]) => (
          <button
            key={name}
            type="button"
            aria-label={name}
            onClick={() => step(direction)}
            className="grid size-12 md:size-16 cursor-pointer place-items-center rounded-full border border-white/70 bg-black/20 backdrop-blur-sm transition-[scale,background-color] duration-150 hover:bg-black/40 active:scale-[0.95]"
          >
            <Icon aria-hidden="true" className="size-5" />
          </button>
        ))}
      </div>
    </section>
  )
}
