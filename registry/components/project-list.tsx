import { useRef, useState, type ReactNode } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { dividerOpacity, rowOpacity } from '@/lib/list-fade'

export type ProjectListItem = {
  title: string
  client: string
  year: string
  href?: string
  media?: ReactNode
}

type ProjectListProps = {
  items: readonly ProjectListItem[]
  className?: string
}

const fade = 'transition-opacity duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)]'

// Le trait part du centre, ses deux points s'écartent vers les bords, puis les textes montent.
function Divider({
  index,
  hovered,
  isShown,
  className = 'top-0',
}: {
  index: number
  hovered: number | null
  isShown: boolean
  className?: string
}) {
  const travel = isShown ? 'translate-x-0' : ''
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-x-[4px] h-[4px] [container-type:inline-size] ${fade} ${className}`}
      style={{ opacity: dividerOpacity(index, hovered) }}
    >
      <span
        className={`absolute top-0 left-0 size-[4px] bg-current opacity-85 transition-[translate,opacity] [transition-duration:580ms,140ms] [transition-delay:60ms,0ms] [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1),cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
          isShown
            ? `${travel} opacity-85`
            : 'translate-x-[calc(50cqw-2px)] opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-85'
        }`}
      />
      <span
        className={`absolute inset-x-[4px] top-[2px] h-px origin-center bg-current opacity-80 transition-[scale] delay-[60ms] duration-[580ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-reduce:transition-none ${
          isShown ? 'scale-x-100' : 'scale-x-0 motion-reduce:scale-x-100'
        }`}
      />
      <span
        className={`absolute top-0 right-0 size-[4px] bg-current opacity-85 transition-[translate,opacity] [transition-duration:580ms,140ms] [transition-delay:60ms,0ms] [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1),cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
          isShown
            ? `${travel} opacity-85`
            : '-translate-x-[calc(50cqw-2px)] opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-85'
        }`}
      />
    </div>
  )
}

function Rising({
  isShown,
  children,
  className,
}: {
  isShown: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <span
        className={`block transition-[translate,opacity] delay-[580ms] duration-[460ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] motion-reduce:transition-none ${
          isShown
            ? 'translate-y-0 opacity-100'
            : 'translate-y-[110%] opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
        }`}
      >
        {children}
      </span>
    </span>
  )
}

// Liste de projets : au survol d'une ligne, les autres s'effacent et le visuel du projet apparaît derrière.
export function ProjectList({ items, className }: ProjectListProps) {
  const ref = useRef<HTMLUListElement>(null)
  const isShown = useInView(ref, 0.2)
  const [hovered, setHovered] = useState<number | null>(null)
  const hasPoster = hovered !== null && Boolean(items[hovered]?.media)

  return (
    <nav aria-label="Projets" className={`relative ${className ?? ''}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 mx-auto hidden aspect-[714/509] w-1/2 -translate-y-1/2 overflow-hidden transition-opacity duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:block"
        style={{ opacity: hasPoster ? 1 : 0 }}
      >
        {items.map((item, index) =>
          item.media ? (
            <div
              key={item.title}
              className="absolute inset-0 transition-[opacity,scale] [transition-duration:580ms,1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] *:size-full *:object-cover"
              style={{
                opacity: hovered === index ? 1 : 0,
                scale: hovered === index ? '1' : '1.015',
              }}
            >
              {item.media}
            </div>
          ) : null,
        )}
      </div>
      <ul ref={ref} className="relative z-10" onPointerLeave={() => setHovered(null)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const Row = item.href ? 'a' : 'div'
          return (
            <li key={item.title} className="relative h-[68px] max-md:h-auto max-md:py-4">
              <Divider index={index} hovered={hovered} isShown={isShown} />
              {isLast && (
                <Divider
                  index={index + 1}
                  hovered={hovered}
                  isShown={isShown}
                  className="top-full"
                />
              )}
              <Row
                {...(item.href ? { href: item.href } : {})}
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                className={`grid h-full translate-y-[2px] grid-cols-[minmax(0,1fr)_auto_auto] content-center items-center gap-x-6 gap-y-2 uppercase md:grid-cols-[minmax(0,1fr)_24%_8rem_4rem] ${item.href ? 'cursor-pointer' : ''} ${fade}`}
                style={{ opacity: rowOpacity(index, hovered) }}
              >
                <Rising
                  isShown={isShown}
                  className="col-span-3 text-[clamp(1.25rem,1.6vw,1.75rem)] leading-none font-bold md:col-span-1"
                >
                  {item.title}
                </Rising>
                <Rising
                  isShown={isShown}
                  className="text-[clamp(0.6875rem,0.8vw,0.875rem)] font-medium"
                >
                  {item.client}
                </Rising>
                <Rising
                  isShown={isShown}
                  className="text-[clamp(0.6875rem,0.8vw,0.875rem)] md:text-center"
                >
                  {item.year}
                </Rising>
                <Rising
                  isShown={isShown}
                  className="text-[clamp(0.6875rem,0.8vw,0.875rem)] md:text-center"
                >
                  /{String(index + 1).padStart(3, '0')}
                </Rising>
              </Row>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
