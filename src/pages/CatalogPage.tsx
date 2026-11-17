import { ArrowUpRightIcon } from 'lucide-react'
import { Link } from 'react-router'

import SiteHeader from '@site/components/SiteHeader'
import { catalogue, items } from '@site/data/catalogue'
import { previews } from '@site/demos/previews'

export default function CatalogPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 pb-24 md:px-8">
        <h1 className="mt-16 max-w-[900px] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
          {catalogue.title}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-[620px] text-lg text-black/60">{catalogue.intro}</p>
        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Preview = previews[item.name]
            return (
              <li key={item.name}>
                <Link
                  to={`/c/${item.name}`}
                  className="group flex h-full flex-col justify-between gap-10 rounded-3xl bg-muted p-7 transition-[background-color,scale] duration-200 hover:bg-[#e8e9ec] active:scale-[0.99]"
                >
                  <div>
                    {Preview && (
                      <div
                        aria-hidden="true"
                        className="-mx-3 -mt-3 mb-7 aspect-[16/10] overflow-hidden rounded-2xl bg-white"
                      >
                        <Preview />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-medium tracking-[-0.03em]">{item.title}</h2>
                      <ArrowUpRightIcon className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-3 line-clamp-2 text-black/60">{item.description}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-white px-3 py-1 text-sm">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
      <footer className="mx-auto max-w-[1240px] px-5 pb-10 text-sm text-black/50 md:px-8">
        {catalogue.footer}
      </footer>
    </>
  )
}
