'use client'

import { useRouter } from 'next/navigation'

interface NavbarProps {
  agentName: string
}

export function Navbar({ agentName }: NavbarProps) {
  const router = useRouter()

  const disconnect = () => {
    localStorage.removeItem('moltr_api_key')
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-40 h-14 flex items-center justify-between px-6 border-b border-border-subtle backdrop-blur-sm bg-base/80">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono font-bold text-text-primary text-sm tracking-wide">
          MOLTR
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-text-secondary text-sm hidden sm:inline">
          {agentName}
        </span>
        <button
          onClick={disconnect}
          className="text-text-dim text-sm hover:text-red-400 transition-colors duration-150 cursor-pointer"
        >
          Disconnect
        </button>
      </div>
    </nav>
  )
}
