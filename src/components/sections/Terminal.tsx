// src/components/sections/Terminal.tsx

import { useState, useRef, useEffect } from 'react'

// ─────────────────────────────────────────
// TIPO: cada linha do terminal tem um tipo
// que define a cor de exibição
// ─────────────────────────────────────────
type LineType = 'input' | 'output' | 'error' | 'success'

interface TerminalLine {
  type: LineType
  content: string
}

// ─────────────────────────────────────────
// COMANDOS DISPONÍVEIS
// Objeto que mapeia comando → resposta
// Adicione quantos quiser!
// ─────────────────────────────────────────
const commands: Record<string, string[]> = {
  help: [
    '📋 Comandos disponíveis:',
    '  whoami      → quem sou eu',
    '  skills      → minhas habilidades',
    '  projects    → meus projetos',
    '  contact     → como me contatar',
    '  clear       → limpar terminal',
  ],
  whoami: [
    '👩‍💻 Brenda G.',
    '   Estudante de Engenharia de Software',
    '   Especialidade: DevOps & Automação',
    '   Status: Buscando estágio 🚀',
  ],
  skills: [
    '🛠️  Stack técnica:',
    '   Languages  → Python, TypeScript, Bash',
    '   DevOps     → Docker, GitHub Actions, Linux',
    '   Cloud      → Vercel, AWS (básico)',
    '   Databases  → PostgreSQL, Redis',
  ],
  projects: [
    '📁 Projetos em destaque:',
    '   [1] Pipeline CI/CD com GitHub Actions',
    '   [2] Sistema de monitoramento com Python',
    '   [3] Automação de deploy com Docker',
    '   → acesse /projetos para ver todos',
  ],
  contact: [
    '📬 Contato:',
    '   GitHub   → github.com/seu-usuario',
    '   LinkedIn → linkedin.com/in/seu-usuario',
    '   Email    → seu@email.com',
  ],
}

// Cores por tipo de linha
const lineColors: Record<LineType, string> = {
  input:   'text-accent',
  output:  'text-text',
  error:   'text-red-400',
  success: 'text-green-400',
}

export default function Terminal() {
  // Histórico de linhas exibidas no terminal
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Bem-vinda ao terminal! Digite "help" para começar.' },
  ])

  // Valor atual do input
  const [input, setInput] = useState('')

  // useRef: acessa o elemento DOM do input diretamente
  // sem precisar de estado — útil para focar o input
  const inputRef = useRef<HTMLInputElement>(null)

  // Ref para o fim do terminal — usamos para auto-scroll
  const bottomRef = useRef<HTMLDivElement>(null)

  // Sempre que lines mudar, rola para o final
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  // Adiciona uma linha nova ao histórico
  const addLine = (type: LineType, content: string) => {
    setLines((prev) => [...prev, { type, content }])
  }

  // Processa o comando digitado
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    // Mostra o comando digitado no histórico
    addLine('input', `$ ${trimmed}`)

    if (trimmed === '') return

    if (trimmed === 'clear') {
      // Limpa o terminal completamente
      setLines([])
      return
    }

    const response = commands[trimmed]

    if (response) {
      // Adiciona cada linha da resposta com delay
      // para simular o terminal "processando"
      response.forEach((line, i) => {
        setTimeout(() => {
          addLine('output', line)
        }, i * 50)
      })
    } else {
      addLine('error', `comando não encontrado: "${trimmed}". Digite "help".`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('') // limpa o input após executar
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">

        {/* ── TÍTULO DA SEÇÃO ── */}
        <div className="mb-8 text-center">
          <p className="font-mono text-accent text-sm mb-2">
            <span className="text-muted">$ </span>interact
          </p>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-text">
            terminal interativo
          </h2>
        </div>

        {/* ── JANELA DO TERMINAL ── */}
        {/* Clicando em qualquer lugar foca o input */}
        <div
          className="mx-auto max-w-2xl rounded-xl border border-border bg-surface overflow-hidden cursor-text"
          onClick={() => inputRef.current?.focus()}
        >

          {/* Barra de título estilo macOS */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-muted">
              brenda@portfolio ~ bash
            </span>
          </div>

          {/* Área de output — altura fixa com scroll */}
          <div className="p-4 h-72 overflow-y-auto font-mono text-sm space-y-1">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`leading-relaxed ${lineColors[line.type]}`}
              >
                {line.content}
              </p>
            ))}
            {/* Elemento invisível no final para auto-scroll */}
            <div ref={bottomRef} />
          </div>

          {/* Input do terminal */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
            <span className="font-mono text-accent text-sm">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent font-mono text-sm text-text outline-none placeholder:text-muted"
              placeholder="digite um comando..."
              autoFocus
              // autocomplete off para não aparecer sugestões do browser
              autoComplete="off"
              spellCheck={false}
            />
          </div>

        </div>
      </div>
    </section>
  )
}