import { Link } from 'react-router'

import SiteHeader from '@site/components/SiteHeader'
import { catalogue } from '@site/data/catalogue'

export default function NotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-24 md:px-8">
        <p className="text-2xl">{catalogue.notFound}</p>
        <Link to="/" className="mt-6 inline-block underline underline-offset-4">
          {catalogue.backLabel}
        </Link>
      </main>
    </>
  )
}
