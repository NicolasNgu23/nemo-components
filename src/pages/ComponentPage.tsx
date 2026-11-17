import { ArrowLeftIcon, ArrowUpRightIcon } from 'lucide-react'
import { Link, useParams } from 'react-router'

import InstallCommand from '@site/components/InstallCommand'
import SiteHeader from '@site/components/SiteHeader'
import { catalogue, items } from '@site/data/catalogue'
import { demos } from '@site/demos/demos'
import NotFoundPage from '@site/pages/NotFoundPage'

export default function ComponentPage() {
  const { name } = useParams()
  const item = items.find((candidate) => candidate.name === name)
  const Demo = name ? demos[name] : undefined
  if (!item || !Demo) return <NotFoundPage />

  return (
    <>
      <title>{`${item.title} · ${catalogue.title}`}</title>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 pb-24 md:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-ink">
          <ArrowLeftIcon className="size-4" />
          {catalogue.backLabel}
        </Link>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_420px]">
          <div>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-medium tracking-[-0.05em]">
              {item.title}
            </h1>
            <p className="mt-5 max-w-[560px] text-lg text-black/60">{item.description}</p>
            <p className="mt-6 text-sm">
              {catalogue.inspiredBy}{' '}
              <a href={item.origin.url} className="inline-flex items-center gap-1 underline underline-offset-4">
                {item.origin.label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <InstallCommand name={item.name} />
            <div>
              <h2 className="text-sm font-medium">{catalogue.measuredValues}</h2>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm text-black/60">
                {item.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <section className="mt-14 rounded-[2rem] bg-muted px-5 md:px-12">
          <Demo />
        </section>
      </main>
    </>
  )
}
