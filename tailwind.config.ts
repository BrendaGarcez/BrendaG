import type { Config } from 'tailwindcss'

const config: Config = {
  
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',  
  ],

  theme: {
    extend: {
      // Adicionando nossas cores customizadas como classes do Tailwind
      // Agora podemos usar: bg-accent, text-accent, border-surface, etc.
      colors: {
        bg: '#0a0e1a',
        surface: '#111827',
        border: '#1f2937',
        text: '#e2e8f0',
        muted: '#64748b',
        accent: '#00ff88',
        'accent-dim': '#00cc6a',
      },

      // Fontes customizadas
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // Animações customizadas — usaremos na Hero e Terminal
      animation: {
        'blink': 'blink 1s step-end infinite',       // cursor piscando
        'fade-in': 'fadeIn 0.5s ease-in-out',        // entrada suave
        'slide-up': 'slideUp 0.6s ease-out',         // slide de baixo pra cima
      },

      // keyframes define como cada animação se comporta
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },

  plugins: [],
}

export default config