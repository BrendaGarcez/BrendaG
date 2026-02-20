// src/components/sections/Skills.tsx

import type { Skill } from '../../types'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

// ─────────────────────────────────────────
// SEUS DADOS DE SKILLS
// Edite o level de 0 a 100 com honestidade!
// ─────────────────────────────────────────
const skills: Skill[] = [
  // Languages
  { name: 'Python',     level: 80, category: 'languages', icon: '🐍' },
  { name: 'TypeScript', level: 70, category: 'languages', icon: '📘' },
  { name: 'Bash',       level: 75, category: 'languages', icon: '💻' },

  // DevOps
  { name: 'Docker',         level: 75, category: 'devops', icon: '🐳' },
  { name: 'GitHub Actions', level: 80, category: 'devops', icon: '⚙️' },
  { name: 'Linux',          level: 70, category: 'devops', icon: '🐧' },

  // Cloud
  { name: 'Vercel', level: 85, category: 'cloud', icon: '▲' },
  { name: 'AWS',    level: 50, category: 'cloud', icon: '☁️' },

  // Databases
  { name: 'PostgreSQL', level: 65, category: 'databases', icon: '🐘' },
  { name: 'Supabase',   level: 70, category: 'databases', icon: '⚡' },

  // Tools
  { name: 'Git',    level: 85, category: 'tools', icon: '🔀' },
  { name: 'VSCode', level: 90, category: 'tools', icon: '📝' },
]

// Agrupa as skills por categoria usando reduce
// Resultado: { languages: [...], devops: [...], ... }
const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = []
  acc[skill.category].push(skill)
  return acc
}, {})

export default function Skills() {
  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="mx-auto max-w-6xl">

        {/* ── TÍTULO ── */}
        <div className="mb-12 text-center">
          <p className="font-mono text-accent text-sm mb-2">
            <span className="text-muted">$ </span>cat skills.json
          </p>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-text">
            habilidades técnicas
          </h2>
        </div>

        {/* ── GRID DE CATEGORIAS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category} hover>
              <Card.Header>
                {/* Badge com a categoria */}
                <Badge
                  label={category}
                  variant={category as any}
                  size="md"
                />
              </Card.Header>

              <Card.Body>
                <div className="space-y-4 mt-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>

                      {/* Nome e nível */}
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-sm text-text flex items-center gap-2">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-muted">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Barra de progresso */}
                      {/* O fundo cinza + barra colorida animada */}
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-1000"
                          // style inline para valor dinâmico
                          // Tailwind não suporta valores dinâmicos como w-[${level}%]
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}