import type { ComponentType } from 'react'

import { RevealWords } from '@/components/reveal-words'
import { RisingWordmark } from '@/components/rising-wordmark'
import { StackedCards } from '@/components/stacked-cards'

function StackedCardsDemo() {
  return (
    <div className="pb-24">
      <StackedCards
        items={[
          { title: 'Premier échange', text: 'Gratuit et sans engagement. Vos objectifs, vos délais, votre budget.' },
          { title: 'Maquette', text: 'La structure, les textes et le design, validés avant la moindre ligne de code.' },
          { title: 'Développement', text: 'Des points réguliers et des tests sur téléphone et ordinateur.' },
          { title: 'Mise en ligne et suivi', text: 'La mise en ligne, une prise en main simple, puis un suivi.' },
        ]}
      />
    </div>
  )
}

function RevealWordsDemo() {
  return (
    <div className="py-24">
      <RevealWords
        as="h2"
        text={'Nous imaginons.\nNous concevons.\nNous développons.'}
        className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.05em]"
      />
    </div>
  )
}

function RisingWordmarkDemo() {
  return (
    <div className="py-24">
      <RisingWordmark text="Nemo Studio" />
    </div>
  )
}

export const demos: Record<string, ComponentType> = {
  'stacked-cards': StackedCardsDemo,
  'reveal-words': RevealWordsDemo,
  'rising-wordmark': RisingWordmarkDemo,
}
