import type { ComponentType } from 'react'

import { CurvedCarousel } from '@/components/curved-carousel'
import { LogoGrid } from '@/components/logo-grid'
import { ProjectList } from '@/components/project-list'
import { RevealWords } from '@/components/reveal-words'
import { RisingWordmark } from '@/components/rising-wordmark'
import { ScrollAccordion } from '@/components/scroll-accordion'
import { ServiceList } from '@/components/service-list'
import { StackedCards } from '@/components/stacked-cards'
import { TestimonialPile } from '@/components/testimonial-pile'

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

function Rings({ hue }: { hue: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 60% 120%, hsl(${hue} 90% 60% / 0.55) 0 18%, hsl(${hue} 90% 60% / 0.32) 18% 30%, hsl(${hue} 90% 60% / 0.18) 30% 44%, hsl(${hue} 90% 60% / 0.08) 44% 60%, transparent 60%)`,
      }}
    />
  )
}

function ScrollAccordionDemo() {
  return (
    <div className="mx-auto max-w-[1000px] py-16">
      <ScrollAccordion
        activeColor="#1735f9"
        items={[
          {
            title: 'Création de site',
            text: 'Un site sur mesure, de la maquette à la mise en ligne, pensé pour le téléphone et pour Google.',
            href: '#',
            visual: <Rings hue={200} />,
          },
          {
            title: 'Refonte de site',
            text: 'Votre site actuel, plus rapide, plus clair et plus moderne, sans perdre ce qui marche déjà.',
            href: '#',
            visual: <Rings hue={250} />,
          },
          {
            title: 'Agents vocaux IA',
            text: 'Un agent qui décroche, répond, qualifie les demandes et prend les rendez-vous, jour et nuit.',
            href: '#',
            visual: <Rings hue={180} />,
          },
          {
            title: 'Automatisation des tâches',
            text: 'Vos outils reliés entre eux, agenda, emails, CRM ou caisse, pour en finir avec les saisies en double.',
            href: '#',
            visual: <Rings hue={220} />,
          },
          {
            title: 'Hébergement et maintenance',
            text: 'Hébergement, mises à jour, sauvegardes et petites modifications, longtemps après la mise en ligne.',
            href: '#',
            visual: <Rings hue={260} />,
          },
        ]}
      />
    </div>
  )
}

const demoLogos = [
  'Café Brume',
  'Onde',
  'Atelier Verre',
  'Nord & Fils',
  'Maison Lumen',
  'Studio Hêtre',
  'Pivot',
  'Les Halles 9',
  'Rivage',
  'Ferme Ardent',
  'Opale',
  'Bureau Sable',
].map((name) => ({ name }))

function LogoGridDemo() {
  return (
    <div className="pt-[60vh] pb-[40vh]">
      <LogoGrid
        title="Ils nous font confiance"
        logos={demoLogos}
        className="mx-auto max-w-[1008px] px-6"
      />
    </div>
  )
}

const demoTestimonials = [
  {
    quote:
      'Pendant trois mois, l’équipe n’a travaillé que sur notre site. On avait l’impression d’avoir un développeur à nous.',
    author: 'Claire Martin, Maison Lumen',
  },
  {
    quote:
      'La réservation en ligne a remplacé la moitié de nos appels. Le site est rapide et nos clients le trouvent tout de suite.',
    author: 'Karim Benali, Café Brume',
  },
  {
    quote:
      'Ils ont compris notre métier avant de proposer quoi que ce soit. L’outil d’IA nous fait gagner une heure par jour.',
    author: 'Sophie Laurent, Onde',
  },
  {
    quote:
      'Des échanges simples, des délais tenus et un résultat au-delà de ce qu’on imaginait au premier rendez-vous.',
    author: 'Julien Morel, Atelier Verre',
  },
  {
    quote:
      'Le nouveau site nous ressemble enfin. Les demandes de devis arrivent maintenant chaque semaine.',
    author: 'Inès Garnier, Nord & Fils',
  },
].map((item) => ({
  quote: item.quote,
  author: <span className="text-sm font-semibold">{item.author}</span>,
}))

function TestimonialPileDemo() {
  return (
    <div className="px-6 pt-[40vh] pb-[30vh]">
      <TestimonialPile title="Ils nous font confiance" items={demoTestimonials} />
    </div>
  )
}

const demoProjects = [
  { title: 'Olive Chicken', client: 'Restaurant', year: '2026', hue: 140 },
  { title: 'Nemo Job', client: 'Application', year: '2026', hue: 230 },
  { title: 'Café Brume', client: 'Site vitrine', year: '2025', hue: 30 },
  { title: 'Atelier Verre', client: 'Boutique en ligne', year: '2025', hue: 190 },
  { title: 'Nord & Fils', client: 'Refonte', year: '2025', hue: 0 },
  { title: 'Onde', client: 'Agent vocal IA', year: '2024', hue: 270 },
].map((item) => ({
  title: item.title,
  client: item.client,
  year: item.year,
  href: '#',
  media: (
    <div
      style={{
        background: `linear-gradient(135deg, hsl(${item.hue} 60% 35%), hsl(${item.hue + 40} 70% 12%))`,
      }}
    >
      <Rings hue={item.hue} />
    </div>
  ),
}))

function ProjectListDemo() {
  return (
    <div className="bg-[#0b0b0d] px-6 py-[30vh] text-white">
      <ProjectList items={demoProjects} className="mx-auto max-w-[920px]" />
    </div>
  )
}

const demoFeatured = [
  {
    title: 'Olive Chicken',
    tag: 'Restaurant',
    description: 'Commande en ligne et réservations pour un restaurant de poulet frit coréen.',
    hue: 140,
    tone: '#3f6b2a',
  },
  {
    title: 'Nemo Job',
    tag: 'Application',
    description: 'Une veille d’offres d’emploi qui adapte le CV à chaque annonce.',
    hue: 220,
    tone: '#2c5c9a',
  },
  {
    title: 'Café Brume',
    tag: 'Site vitrine',
    description: 'Un site rapide qui donne envie de pousser la porte.',
    hue: 25,
    tone: '#8a4a22',
  },
  {
    title: 'Atelier Verre',
    tag: 'Boutique',
    description: 'Une boutique en ligne pour des pièces soufflées à la main.',
    hue: 185,
    tone: '#1f6a6a',
  },
  {
    title: 'Onde',
    tag: 'Agent IA',
    description: 'Un agent vocal qui prend les rendez-vous à toute heure.',
    hue: 280,
    tone: '#5a3a8a',
  },
].map((item) => ({
  title: item.title,
  tag: item.tag,
  badge: 'À la une',
  description: item.description,
  href: '#',
  cta: 'Voir le projet',
  tone: item.tone,
  visual: (
    <div
      style={{
        background: `linear-gradient(135deg, hsl(${item.hue} 55% 30%), hsl(${item.hue + 50} 70% 10%))`,
      }}
    >
      <Rings hue={item.hue} />
    </div>
  ),
}))

function CurvedCarouselDemo() {
  return <CurvedCarousel items={demoFeatured} />
}

export const demos: Record<string, ComponentType> = {
  'stacked-cards': StackedCardsDemo,
  'reveal-words': RevealWordsDemo,
  'rising-wordmark': RisingWordmarkDemo,
  'service-list': ServiceListDemo,
  'scroll-accordion': ScrollAccordionDemo,
  'logo-grid': LogoGridDemo,
  'testimonial-pile': TestimonialPileDemo,
  'project-list': ProjectListDemo,
  'curved-carousel': CurvedCarouselDemo,
}
