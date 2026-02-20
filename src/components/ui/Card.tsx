import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  // hover: adiciona efeito de elevação ao passar o mouse
  hover?: boolean
  // glow: adiciona brilho verde nas bordas
  glow?: boolean
  children: React.ReactNode
}

export default function Card({
  hover = false,
  glow = false,
  children,
  className = '',
  ...props
}: CardProps) {

  return (
    <div
      className={`
        rounded-xl border border-border bg-surface p-6
        transition-all duration-300
        ${hover ? 'hover:-translate-y-1 hover:border-accent/30 cursor-pointer' : ''}
        ${glow ? 'glow-border' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

// Card.Body — conteúdo principal
Card.Body = function CardBody({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`text-muted text-sm leading-relaxed ${className}`}>
      {children}
    </div>
  )
}

// Card.Footer — ações, links, badges
Card.Footer = function CardFooter({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mt-4 pt-4 border-t border-border flex items-center gap-2 flex-wrap ${className}`}>
      {children}
    </div>
  )
}
