// src/pages/About.tsx

import Button from '../components/ui/Button'

// ─────────────────────────────────────────
// DADOS DA TIMELINE
// Sua jornada em ordem cronológica
// Edite com suas experiências reais!
// ─────────────────────────────────────────
const timeline = [
  {
    year: '2024',
    title: 'Início na área de DevOps',
    description: 'Primeiros contatos com Docker, CI/CD e automação de pipelines.',
    icon: '🚀',
  },
  {
    year: '2023',
    title: 'Ingresso na faculdade',
    description: 'Início do curso de Engenharia de Software. Primeiros passos com Python e lógica de programação.',
    icon: '🎓',
  },
  {
    year: '2023',
    title: 'Primeiro projeto open source',
    description: 'Contribuição para projetos no GitHub e criação dos primeiros scripts de automação.',
    icon: '💻',
  },
]

// ─────────────────────────────────────────
// VALORES / O QUE VOCÊ BUSCA
// ─────────────────────────────────────────
const values = [
  { icon: '⚙️', title: 'Automação', desc: 'Se pode ser automatizado, deve ser.' },
  { icon: '📖', title: 'Aprendizado', desc: 'Sempre há algo novo para aprender.' },
  { icon: '🔍', title: 'Qualidade', desc: 'Código que funciona e é fácil de manter.' },
  { icon: '🤝', title: 'Colaboração', desc: 'Os melhores produtos nascem em equipe.' },
]

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">

      {/* ── CABEÇALHO ── */}
      <div className="mb-16">
        <p className="font-mono text-accent text-sm mb-2">
          <span className="text-muted">$ </span>cat sobre-mim.txt
        </p>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-text mb-6">
          sobre mim
        </h1>

        {/* Layout de duas colunas em desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Texto de apresentação */}
          <div className="space-y-4">
            <p className="font-mono text-muted leading-relaxed">
              Sou estudante de Engenharia de Software apaixonada por DevOps,
              automação e boas práticas de desenvolvimento. Acredito que
              infraestrutura bem feita é tão importante quanto o código em si.
            </p>
            <p className="font-mono text-muted leading-relaxed">
              Tenho experiência com pipelines CI/CD, containerização com Docker,
              scripting em Python e Bash, e estou sempre buscando formas de
              tornar processos mais eficientes e confiáveis.
            </p>
            <p className="font-mono text-muted leading-relaxed">
              Busco uma oportunidade de estágio onde possa contribuir com
              automação e engenharia de software enquanto aprendo com
              profissionais experientes.
            </p>

            {/* Botão de download do currículo */}
            <div className="pt-4">
              <a href="/curriculo.pdf" download>
                <Button variant="primary" size="md">
                  baixar currículo ↓
                </Button>
              </a>
            </div>
          </div>

          {/* Info rápida — lado direito */}
          <div className="space-y-4 font-mono">
            {[
              { label: 'localização', value: 'Brasil 🇧🇷' },
              { label: 'curso',       value: 'Engenharia de Software' },
              { label: 'foco',        value: 'DevOps & Automação' },
              { label: 'status',      value: '🟢 disponível para estágio' },
              { label: 'email',       value: 'seu@email.com' },
            ].map((info) => (
              <div
                key={info.label}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-border"
              >
                {/* Label com cor de destaque */}
                <span className="text-accent text-sm w-32 shrink-0">
                  {info.label}
                </span>
                <span className="text-text text-sm">
                  {info.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── VALORES ── */}
      <div className="mb-16">
        <h2 className="font-mono text-xl font-bold text-text mb-8">
          o que me move
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-5 rounded-xl border border-border bg-surface hover:border-accent/30 transition-colors"
            >
              <span className="text-2xl mb-3 block">{value.icon}</span>
              <h3 className="font-mono text-sm font-bold text-text mb-1">
                {value.title}
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="mb-16">
        <h2 className="font-mono text-xl font-bold text-text mb-8">
          minha jornada
        </h2>

        <div className="relative">
          {/* Linha vertical da timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 relative">

                {/* Ícone na timeline */}
                <div className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center shrink-0 z-10">
                  <span>{item.icon}</span>
                </div>

                {/* Conteúdo */}
                <div className="pb-2">
                  <span className="font-mono text-xs text-accent mb-1 block">
                    {item.year}
                  </span>
                  <h3 className="font-mono text-sm font-bold text-text mb-1">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div className="text-center py-12 border border-dashed border-border rounded-xl">
        <p className="font-mono text-accent text-sm mb-2">
          <span className="text-muted">$ </span>echo "vamos trabalhar juntos?"
        </p>
        <h2 className="font-mono text-2xl font-bold text-text mb-4">
          disponível para estágio
        </h2>
        <p className="font-mono text-muted mb-6 max-w-md mx-auto">
          Estou buscando uma oportunidade para aplicar e expandir meus
          conhecimentos em um ambiente profissional.
        </p>
        <a href="mailto:seu@email.com">
          <Button variant="primary" size="lg">
            entrar em contato →
          </Button>
        </a>
      </div>

    </main>
  )
}