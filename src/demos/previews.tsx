import type { ComponentType } from 'react'

import { RevealWords } from '@/components/reveal-words'
import { RisingWordmark } from '@/components/rising-wordmark'
import { ScrollAccordion } from '@/components/scroll-accordion'
import { LogoGrid } from '@/components/logo-grid'
import { ProjectList } from '@/components/project-list'
import { ServiceList } from '@/components/service-list'
import { TestimonialPile } from '@/components/testimonial-pile'

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

function ServiceListPreview() {
  return (
    <div className="grid h-full items-center px-4">
      <div className="w-[250%] origin-left [zoom:0.4]">
        <ServiceList
          items={[
            {
              title: 'Création de site',
              text: 'Un site sur mesure, pensé pour le téléphone.',
              tags: ['Maquette', 'Design'],
            },
            {
              title: 'Agents vocaux IA',
              text: 'Un agent qui décroche et prend les rendez-vous.',
              tags: ['Appels', '24 h/24'],
            },
            {
              title: 'Automatisation',
              text: 'Vos outils reliés entre eux.',
              tags: ['CRM', 'Agenda'],
            },
          ]}
        />
      </div>
    </div>
  )
}

// Le vrai composant, réduit : ses cartes s'ouvrent selon leur position dans l'écran, donc aussi quand la carte
// du catalogue remonte pendant le défilement.
function ScrollAccordionPreview() {
  return (
    <div className="h-full overflow-hidden px-4 pt-4">
      <div className="w-[300%] origin-top-left [zoom:0.33]">
        <ScrollAccordion
          activeColor="#1735f9"
          items={[
            { title: 'Création de site', text: 'Un site sur mesure, pensé pour le téléphone.' },
            { title: 'Agents vocaux IA', text: 'Un agent qui décroche et prend les rendez-vous.' },
            { title: 'Automatisation', text: 'Vos outils reliés entre eux.' },
          ]}
        />
      </div>
    </div>
  )
}

function LogoGridPreview() {
  return (
    <div className="h-full overflow-hidden px-6 pt-6">
      <div className="w-[250%] origin-top-left [zoom:0.4]">
        <LogoGrid
          title="Ils nous font confiance"
          logos={[
            'Café Brume',
            'Onde',
            'Atelier Verre',
            'Nord & Fils',
            'Maison Lumen',
            'Pivot',
            'Rivage',
            'Opale',
          ].map((name) => ({ name }))}
        />
      </div>
    </div>
  )
}

// Le vrai composant, réduit : survoler la carte du catalogue range le tas.
function TestimonialPilePreview() {
  return (
    <div className="h-full overflow-hidden px-4 pt-6">
      <div className="w-[300%] origin-top-left [zoom:0.33]">
        <TestimonialPile
          title="Ils nous font confiance"
          items={[
            'Un site qui nous ressemble enfin.',
            'Une heure gagnée chaque jour.',
            'Des délais tenus.',
            'Les devis arrivent chaque semaine.',
            'Un vrai partenaire.',
          ].map((quote) => ({ quote, author: <span className="font-semibold">Exemple</span> }))}
        />
      </div>
    </div>
  )
}

function ProjectListPreview() {
  return (
    <div className="h-full overflow-hidden bg-[#0b0b0d] px-5 pt-6 text-white">
      <div className="w-[200%] origin-top-left [zoom:0.5]">
        <ProjectList
          items={[
            { title: 'Olive Chicken', client: 'Restaurant', year: '2026' },
            { title: 'Nemo Job', client: 'Application', year: '2026' },
            { title: 'Café Brume', client: 'Site vitrine', year: '2025' },
            { title: 'Atelier Verre', client: 'Boutique', year: '2025' },
          ]}
        />
      </div>
    </div>
  )
}

export const previews: Record<string, ComponentType> = {
  'stacked-cards': StackedCardsPreview,
  'reveal-words': RevealWordsPreview,
  'rising-wordmark': RisingWordmarkPreview,
  'service-list': ServiceListPreview,
  'scroll-accordion': ScrollAccordionPreview,
  'logo-grid': LogoGridPreview,
  'testimonial-pile': TestimonialPilePreview,
  'project-list': ProjectListPreview,
}
