import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  // isLoading mostra um spinner e desabilita o botão
  isLoading?: boolean
  // children é o conteúdo dentro do botão
  // React.ReactNode aceita texto, JSX, ícones, etc
  children: React.ReactNode
}
const variantStyles = {
  primary:   'bg-accent text-bg hover:bg-accent-dim border-transparent',
  secondary: 'bg-transparent text-accent hover:bg-accent/10 border-accent',
  ghost:     'bg-transparent text-muted hover:text-text hover:bg-surface border-transparent',
  danger:    'bg-transparent text-red-400 hover:bg-red-900/20 border-red-700/50',
}

const sizeStyles = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  // ...props captura TODOS os outros atributos (onClick, type, etc)
  // e repassa para o <button> nativo
  ...props
}: ButtonProps) {

  return (
    <button
      // Desabilita se estiver carregando ou se vier disabled nas props
      disabled={isLoading || disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg border font-mono font-medium
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      // Spread: joga todas as outras props no elemento nativo
      {...props}
    >
      {/* Spinner de loading — só aparece quando isLoading=true */}
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}

      {children}
    </button>
  )
}