import { useRef, type ReactNode } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { columnDelay } from '@/lib/column-delay'

export type LogoGridItem = {
  name: string
  logo?: ReactNode
  href?: string
}

type LogoGridProps = {
  title: string
  logos: readonly LogoGridItem[]
  columns?: number
  className?: string
}

const wordStepMs = 150

function Heading({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, 0)
  const words = title.split(' ')

  return (
    <h2
      ref={ref}
      aria-label={title}
      className="text-center text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] font-normal"
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="-my-[0.2em] inline-block overflow-clip py-[0.2em] align-top">
            <span
              className={`inline-block transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isInView
                  ? '[transform:translateY(0)]'
                  : '[transform:translateY(120%)] motion-reduce:[transform:none]'
              }`}
              style={{ transitionDelay: `${index * wordStepMs}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </h2>
  )
}

function LogoCell({ item, delay }: { item: LogoGridItem; delay: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const isInView = useInView(ref, 0)
  const content = item.logo ?? (
    <span className="pr-3 text-[clamp(1.125rem,2vw,1.75rem)] leading-tight font-semibold tracking-[-0.03em]">
      {item.name}
    </span>
  )
  const cell = `flex h-[clamp(4.5rem,7.4vw,6.625rem)] items-center justify-start transition-opacity duration-[1900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none ${
    isInView ? 'opacity-100' : 'opacity-0 motion-reduce:opacity-100'
  }`

  return (
    <li ref={ref} className="list-none">
      {item.href ? (
        <a
          href={item.href}
          aria-label={item.name}
          className={`${cell} cursor-pointer`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {content}
        </a>
      ) : (
        <div className={cell} style={{ transitionDelay: `${delay}ms` }}>
          {content}
        </div>
      )}
    </li>
  )
}

// Le titre monte mot à mot ; chaque ligne de logos apparaît en fondu en entrant à l'écran, de gauche à
// droite.
export function LogoGrid({ title, logos, columns = 4, className }: LogoGridProps) {
  return (
    <section className={className}>
      <Heading title={title} />
      <ul
        className="mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-2 gap-y-[clamp(1.5rem,3.75vw,3.375rem)] md:[grid-template-columns:repeat(var(--logo-grid-columns),minmax(0,1fr))]"
        style={{ ['--logo-grid-columns' as string]: columns }}
      >
        {logos.map((item, index) => (
          <LogoCell key={item.name} item={item} delay={columnDelay(index, columns)} />
        ))}
      </ul>
    </section>
  )
}
