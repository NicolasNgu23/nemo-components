import { Link } from 'react-router'

import { catalogue } from '@site/data/catalogue'

export default function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-6 md:px-8">
      <Link to="/" className="font-semibold tracking-[-0.03em]">
        {catalogue.title}
        <span className="text-accent">.</span>
      </Link>
      <a
        href="https://nemo-studio-one.vercel.app/"
        className="text-sm text-black/60 transition-colors hover:text-ink"
      >
        par Nemo Studio
      </a>
    </header>
  )
}
