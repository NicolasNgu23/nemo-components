import { useParams } from 'react-router'

import { demos } from '@site/demos/demos'
import NotFoundPage from '@site/pages/NotFoundPage'

// La démo seule, sans en-tête ni marges du catalogue, pour que Reanimate la capture comme la référence.
export default function BarePage() {
  const { name } = useParams()
  const Demo = name ? demos[name] : undefined
  if (!Demo) return <NotFoundPage />
  return (
    <main className="min-h-[300vh] px-10 pt-[100vh]">
      <Demo />
    </main>
  )
}
