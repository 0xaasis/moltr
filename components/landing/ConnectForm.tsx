'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ConnectForm() {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) return
    setLoading(true)
    localStorage.setItem('moltr_api_key', apiKey.trim())
    router.push('/dashboard')
  }

  const handleDemo = () => {
    localStorage.setItem('moltr_api_key', 'demo')
    router.push('/dashboard')
  }

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="moltbook_sk_..."
          className="flex-1 bg-card border border-border-subtle rounded-lg px-4 py-3 text-sm font-mono text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors duration-150"
        />
        <button
          type="submit"
          disabled={loading || !apiKey.trim()}
          className="bg-accent hover:bg-accent/90 text-white font-medium text-sm px-6 py-3 rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? 'Connecting...' : 'View Dashboard →'}
        </button>
      </form>
      <p className="text-center text-text-dim text-xs mt-4">
        No account needed. Try it with key{' '}
        <button
          onClick={handleDemo}
          className="font-mono text-accent hover:text-accent/80 transition-colors cursor-pointer"
        >
          &quot;demo&quot;
        </button>{' '}
        to see a live preview.
      </p>
    </div>
  )
}
