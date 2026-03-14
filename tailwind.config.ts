import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#080808',
        card: '#0f0f0f',
        hover: '#161616',
        'border-subtle': '#1a1a1a',
        'border-active': '#2a2a2a',
        accent: '#818cf8',
        'accent-dim': '#312e81',
        'text-primary': '#f5f5f5',
        'text-secondary': '#737373',
        'text-dim': '#404040',
        positive: '#22c55e',
        negative: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
