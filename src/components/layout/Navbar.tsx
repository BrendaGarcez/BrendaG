// src/components/layout/Navbar.tsx

import { useState } from 'react'

// useLocation → retorna a URL atual (ex: { pathname: '/projetos' })
// Link → navegação sem recarregar a página (como o <a> mas do React Router)
import { Link, useLocation } from 'react-router-dom'

import type { NavLink } from '../../types'

// ─────────────────────────────────────────
// DADOS DOS LINKS
// Definido fora do componente pois não muda nunca
// Evita recriar o array a cada renderização
// ─────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'início',   path: '/' },
  { label: 'projetos', path: '/projetos' },
  { label: 'sobre',    path: '/sobre' },
]

export default function Navbar() {
  // useState: hook que guarda estado local do componente
  // isOpen controla se o menu mobile está aberto ou fechado
  // setIsOpen é a função para atualizar esse estado
  const [isOpen, setIsOpen] = useState(false)

  // useLocation retorna o objeto de localização atual
  // usamos o pathname para saber qual link está ativo
  const { pathname } = useLocation()

  // Função para verificar se o link é a rota ativa
  // Caso especial: '/' só é ativo se for exatamente '/'
  // Os outros são ativos se o pathname começa com o path do link
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    // sticky top-0: gruda no topo ao rolar a página
    // z-50: fica acima de todos os outros elementos
    // backdrop-blur: efeito de vidro fosco
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* ── LOGO ── */}
          <Link
            to="/"
            className="font-mono text-lg font-bold text-accent hover:opacity-80 transition-opacity"
          >
            {/* ~/ é referência ao terminal Linux — combina com o tema DevOps */}
            <span className="text-muted">~/</span>brendag
          </Link>

          {/* ── LINKS DESKTOP ── */}
          {/* hidden md:flex → esconde em mobile, mostra a partir de md (768px) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200
                  ${isActive(link.path)
                    // Link ativo: texto verde com fundo sutil
                    ? 'text-accent bg-accent/10'
                    // Link inativo: texto acinzentado, fica verde ao hover
                    : 'text-muted hover:text-text hover:bg-surface'
                  }
                `}
              >
                {/* Ponto antes do link ativo — detalhe de terminal */}
                {isActive(link.path) && (
                  <span className="mr-1 text-accent">▸</span>
                )}
                {link.label}
              </Link>
            ))}

            {/* Separador visual */}
            <div className="mx-2 h-4 w-px bg-border" />

            {/* Link do admin separado — não aparece na lista principal */}
            <Link
              to="/admin"
              className="px-4 py-2 rounded-lg font-mono text-sm text-muted hover:text-accent transition-colors"
            >
              admin
            </Link>
          </div>

          {/* ── BOTÃO MENU MOBILE ── */}
          {/* md:hidden → só aparece em telas menores que 768px */}
          <button
            className="md:hidden text-muted hover:text-text transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
            // Acessibilidade: informa o estado do menu para leitores de tela
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {/* Ícone muda de hamburguer para X dependendo do estado */}
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>

        {/* ── MENU MOBILE ── */}
        {/* Só renderiza se isOpen for true */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                // Fecha o menu ao clicar em um link
                onClick={() => setIsOpen(false)}
                className={`
                  px-4 py-3 rounded-lg font-mono text-sm transition-all
                  ${isActive(link.path)
                    ? 'text-accent bg-accent/10'
                    : 'text-muted hover:text-text hover:bg-surface'
                  }
                `}
              >
                {isActive(link.path) && <span className="mr-1">▸</span>}
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg font-mono text-sm text-muted hover:text-accent"
            >
              admin
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}