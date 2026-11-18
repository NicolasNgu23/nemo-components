import type { ComponentType } from 'react'

import { RevealWords } from '@/components/reveal-words'
import { RisingWordmark } from '@/components/rising-wordmark'
import { ServiceList } from '@/components/service-list'
import { StackedCards } from '@/components/stacked-cards'

function StackedCardsDemo() {
  return (
    <div className="pb-24">
      <StackedCards
        items={[
          {
            title: 'Premier échange',
            text: 'Gratuit et sans engagement. Vos objectifs, vos délais, votre budget.',
          },
          {
            title: 'Maquette',
            text: 'La structure, les textes et le design, validés avant la moindre ligne de code.',
          },
          {
            title: 'Développement',
            text: 'Des points réguliers et des tests sur téléphone et ordinateur.',
          },
          {
            title: 'Mise en ligne et suivi',
            text: 'La mise en ligne, une prise en main simple, puis un suivi.',
          },
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

function ServiceListDemo() {
  return (
    <div className="py-16">
      <ServiceList
        items={[
          {
            title: 'Création de site',
            text: 'Un site sur mesure, de la maquette à la mise en ligne, pensé pour le téléphone et pour Google.',
            tags: ['Maquette', 'Développement', 'Référencement'],
          },
          {
            title: 'Refonte de site',
            text: 'Votre site actuel, plus rapide, plus clair et plus moderne, sans perdre ce qui marche déjà.',
            tags: ['Audit', 'Design', 'Vitesse'],
          },
          {
            title: 'Agents vocaux IA',
            text: 'Un agent qui décroche, répond, qualifie les demandes et prend les rendez-vous, jour et nuit.',
            tags: ['Appels', 'Rendez-vous', '24 h/24'],
          },
          {
            title: 'Automatisation des tâches',
            text: 'Vos outils reliés entre eux, agenda, emails, CRM ou caisse, pour en finir avec les saisies en double.',
            tags: ['Workflows', 'CRM', 'Agenda'],
          },
          {
            title: 'Hébergement et maintenance',
            text: 'Hébergement, mises à jour, sauvegardes et petites modifications, longtemps après la mise en ligne.',
            tags: ['Hébergement', 'Mises à jour', 'Support'],
          },
        ]}
      />
    </div>
  )
}

export const demos: Record<string, ComponentType> = {
  'stacked-cards': StackedCardsDemo,
  'reveal-words': RevealWordsDemo,
  'rising-wordmark': RisingWordmarkDemo,
  'service-list': ServiceListDemo,
}
