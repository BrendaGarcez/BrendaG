// src/components/sections/Hero.tsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

// ─────────────────────────────────────────
// FRASES QUE VÃO ROTACIONAR NO HERO
// Edite com suas especialidades reais
// ─────────────────────────────────────────
const roles = [
  'DevOps Engineer',
  'Software Engineer',
  'Automation Developer',
  'CI/CD Enthusiast',
]

export default function Hero() {
  // Índice da frase atual no array roles
  const [roleIndex, setRoleIndex] = useState(0)

  // Texto que está sendo "digitado" na tela
  const [displayText, setDisplayText] = useState('')

  // Controla se está digitando (true) ou apagando (false)
  const [isTyping, setIsTyping] = useState(true)

  // useEffect roda após a renderização
  // O array [roleIndex, isTyping] são as dependências
  // Sempre que um desses mudar, o efeito roda de novo
  useEffect(() => {
    const currentRole = roles[roleIndex]

    if (isTyping) {
      // Se ainda não digitou a frase completa, adiciona uma letra
      if (displayText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 80) // velocidade de digitação em ms

        // cleanup: cancela o timeout se o componente desmontar
        return () => clearTimeout(timeout)
      } else {
        // Frase completa — espera 2s antes de apagar
        const timeout = setTimeout(() => setIsTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      // Apagando: remove uma letra por vez
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40) // apaga mais rápido que digita
        return () => clearTimeout(timeout)
      } else {
        // Texto apagado — vai para a próxima frase
        setIsTyping(true)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }
  }, [displayText, isTyping, roleIndex])

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">

          {/* ── LINHA DE BOAS VINDAS ── */}
          <p className="font-mono text-accent text-sm mb-4 animate-fade-in">
            {/* Simula um comando de terminal */}
            <span className="text-muted">$ </span>
            whoami
          </p>

          {/* ── NOME PRINCIPAL ── */}
          <h1 className="font-mono text-4xl md:text-6xl font-bold text-text mb-4 animate-slide-up">
            Olá, eu sou{' '}
            {/* text-gradient usa a classe que criamos no globals.css */}
            <span className="text-gradient">Brenda</span>
          </h1>

          {/* ── EFEITO DE DIGITAÇÃO ── */}
          <div className="flex items-center gap-2 mb-6 h-10">
            <span className="font-mono text-xl md:text-2xl text-muted">
              {displayText}
            </span>
            {/* Cursor piscando — animate-blink criamos no tailwind.config */}
            <span className="w-0.5 h-6 bg-accent animate-blink" />
          </div>

          {/* ── DESCRIÇÃO ── */}
          <p className="font-mono text-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            Estudante apaixonada por automação, pipelines CI/CD e boas
            práticas de engenharia de software. Buscando estágio para
            transformar café em{' '}
            <span className="text-accent">código que funciona em produção</span>.
          </p>

          {/* ── BOTÕES DE AÇÃO ── */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/projetos">
              <Button variant="primary" size="lg">
                ver projetos
              </Button>
            </Link>
            <Link to="/sobre">
              <Button variant="secondary" size="lg">
                sobre mim
              </Button>
            </Link>
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="lg">
                github ↗
              </Button>
            </a>
          </div>

          {/* ── STATS RÁPIDOS ── */}
          {/* Números que resumem seu perfil */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: '10+', label: 'projetos' },
              { value: '5+', label: 'tecnologias' },
              { value: '100%', label: 'dedicação' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-mono text-2xl font-bold text-accent">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}