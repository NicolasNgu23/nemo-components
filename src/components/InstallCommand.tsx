import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

import { catalogue, registryUrl } from '@site/data/catalogue'

export default function InstallCommand({ name }: { name: string }) {
  const [isCopied, setIsCopied] = useState(false)
  const command = `pnpm dlx shadcn@latest add ${registryUrl}/${name}.json`

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1600)
  }

  return (
    <div>
      <p className="text-sm text-black/50">{catalogue.installHint}</p>
      <div className="mt-2 flex items-center gap-2 rounded-2xl bg-ink py-2 pr-2 pl-4 text-white">
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap [scrollbar-width:none]">
          {command}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={isCopied ? catalogue.copiedLabel : catalogue.copyLabel}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl bg-white/10 transition-[background-color,scale] duration-150 hover:bg-white/20 active:scale-[0.97]"
        >
          {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
        </button>
      </div>
    </div>
  )
}
