import type { ComponentType } from 'react'

import { RevealWords } from '@/components/reveal-words'
import { RisingWordmark } from '@/components/rising-wordmark'

const miniCards = ['01', '02', '03']

// Le vrai composant a besoin d'une page entière à faire défiler : l'aperçu rejoue l'empilement en boucle.
function StackedCardsPreview() {
  return (
    <div className="relative h-full w-full">
      {miniCards.map((number, index) => (
        <div
          key={number}
          className="absolute inset-x-[12%] top-[16%] flex h-[56%] origin-top items-start justify-between rounded-xl border border-black/10 bg-white p-3 motion-reduce:[animation:none!important]"
          style={{
            animation: `stack-${index} 4.8s cubic-bezier(0.22, 1, 0.36, 1) infinite`,
            zIndex: index,
          }}
        >
          <span className="text-2xl leading-none font-light tracking-[-0.04em]">{number}</span>
          <span className="flex gap-1 pt-1">
            {miniCards.map((other, otherIndex) => (
              <span
                key={other}
                className={`h-px w-3 bg-current ${otherIndex <= index ? '' : 'opacity-15'}`}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

function RevealWordsPreview() {
  return (
    <div className="grid h-full place-items-center px-6">
      <RevealWords
        text={'Nous imaginons.\nNous concevons.'}
        className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[0.95] font-medium tracking-[-0.05em]"
      />
    </div>
  )
}

function RisingWordmarkPreview() {
  return (
    <div className="grid h-full items-center px-6">
      <RisingWordmark text="Nemo Studio" />
    </div>
  )
}

export const previews: Record<string, ComponentType> = {
  'stacked-cards': StackedCardsPreview,
  'reveal-words': RevealWordsPreview,
  'rising-wordmark': RisingWordmarkPreview,
}
