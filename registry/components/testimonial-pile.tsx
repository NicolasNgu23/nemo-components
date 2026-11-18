import { useRef, type CSSProperties, type ReactNode } from 'react'
import { QuoteIcon } from 'lucide-react'

import { useInView } from '@/hooks/use-in-view'
import { pileOffset } from '@/lib/pile-offset'

export type Testimonial = {
  quote: string
  author: ReactNode
}

type TestimonialPileProps = {
  title: string
  items: readonly Testimonial[]
  tones?: readonly string[]
  className?: string
}

const wordStepMs = 150
const defaultTones = ['#eef1fb', '#e4f5f2', '#eef1fb', '#e4f5f2', '#e4f5f2']

function Heading({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, 0)
  const words = title.split(' ')

  return (
    <h2
      ref={ref}
      aria-label={title}
      className="text-center text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.1] font-medium tracking-[-0.02em]"
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

// Les cartes reposent en tas penché ; survoler le tas (ou y entrer au clavier) les remet en grille. Sur
// écran tactile, sans survol possible, la grille reste rangée pour que tout se lise.
export function TestimonialPile({
  title,
  items,
  tones = defaultTones,
  className,
}: TestimonialPileProps) {
  return (
    <section className={className}>
      <Heading title={title} />
      <ul className="group mx-auto mt-[clamp(3rem,7vw,6.5rem)] flex max-w-[1110px] flex-wrap items-start justify-center gap-[15px]">
        {items.map((item, index) => {
          const offset = pileOffset(index)
          const style = {
            '--pile-x': `${offset.x}px`,
            '--pile-y': `${offset.y}px`,
            '--pile-rotate': `${offset.rotate}deg`,
            backgroundColor: tones[index % tones.length],
            zIndex: offset.rotate === 0 ? 0 : 1,
          } as CSSProperties

          return (
            <li
              key={index}
              style={style}
              className="relative w-[360px] max-w-full rounded-[7px] border-4 border-white p-[clamp(1.75rem,3vw,2.8rem)] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none [@media(hover:hover)]:[.group:not(:hover,:focus-within)_&]:[transform:translate(var(--pile-x),var(--pile-y))_rotate(var(--pile-rotate))]"
            >
              <QuoteIcon
                aria-hidden="true"
                className="size-9 fill-current stroke-0 opacity-10"
              />
              <blockquote className="mt-[clamp(1.25rem,2.5vw,2rem)] text-[16px] leading-[1.4]">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 h-px w-[54px] bg-current opacity-15" />
              <div className="mt-6">{item.author}</div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
