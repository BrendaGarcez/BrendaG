import type { ProjectCategory, SkillCategory } from '../../types'

interface BadgeProps {
    label: string
    variant?: ProjectCategory | SkillCategory | 'default'

    size?: 'sm'|'md'
}


const variantStyles: Record<string, string> = {
    devops: 'bg-green-900/40 text-green-400 border-green-700/50',
    backend: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
    frontend: 'bg-purple-900/40 text-purple-400 border-purple-700/50',
    automation: 'bg-yellow-900/40 text-yellow-400 border-yellow-700/50',
    fullstack: 'bg-pink-900/40 text-pink-400 border-pink-700/50',
    languages: 'bg-cyan-900/40 text-cyan-400 border-cyan-700/50',
    cloud: 'bg-orange-900/40 text-orange-400 border-orange-700/50',
    databases: 'bg-red-900/40 text-red-400 border-red-700/50',
    tools: 'bg-slate-800/40 text-slate-400 border-slate-600/50',
    default: 'bg-surface text-muted border-border',
} 

const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
}


export default function Badge({
  label,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {

  // Pega o estilo do lookup, se não encontrar usa o 'default'
  const colorStyle = variantStyles[variant] ?? variantStyles.default

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-mono font-medium
        ${sizeStyles[size]}
        ${colorStyle}
      `}
    >
      {label}
    </span>
  )
}