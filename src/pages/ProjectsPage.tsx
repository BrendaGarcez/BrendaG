// src/pages/ProjectsPage.tsx

import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import type { ProjectCategory } from '../types'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// ─────────────────────────────────────────
// FILTROS DISPONÍVEIS
// null = todos os projetos
// ─────────────────────────────────────────
const filters: { label: string; value: ProjectCategory | null }[] = [
  { label: 'todos',      value: null },
  { label: 'devops',     value: 'devops' },
  { label: 'backend',    value: 'backend' },
  { label: 'frontend',   value: 'frontend' },
  { label: 'automation', value: 'automation' },
  { label: 'fullstack',  value: 'fullstack' },
]

export default function ProjectsPage() {
  // Categoria selecionada no filtro
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | null>(null)

  // Usa o hook que criamos — passa o filtro ativo
  // Quando activeFilter mudar, o hook rebusca automaticamente
  const { data: projects, loading, error } = useProjects({
    category: activeFilter ?? undefined,
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">

      {/* ── CABEÇALHO ── */}
      <div className="mb-12">
        <p className="font-mono text-accent text-sm mb-2">
          <span className="text-muted">$ </span>ls ./projects
        </p>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-text mb-4">
          todos os projetos
        </h1>
        <p className="font-mono text-muted max-w-xl">
          Automações, pipelines, APIs e interfaces — tudo que construí
          ao longo da minha jornada em engenharia de software.
        </p>
      </div>

      {/* ── FILTROS ── */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.value)}
            className={`
              font-mono text-sm px-4 py-2 rounded-lg border transition-all duration-200
              ${activeFilter === filter.value
                ? 'bg-accent/10 text-accent border-accent/30'
                : 'text-muted border-border hover:text-text hover:bg-surface'
              }
            `}
          >
            {/* Indicador visual do filtro ativo */}
            {activeFilter === filter.value && (
              <span className="mr-1">▸</span>
            )}
            {filter.label}
          </button>
        ))}
      </div>

      {/* ── LOADING ── */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-6 animate-pulse"
            >
              <div className="h-4 bg-border rounded w-3/4 mb-4" />
              <div className="h-3 bg-border rounded w-full mb-2" />
              <div className="h-3 bg-border rounded w-2/3 mb-6" />
              <div className="flex gap-2">
                <div className="h-5 bg-border rounded-full w-16" />
                <div className="h-5 bg-border rounded-full w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ERRO ── */}
      {error && (
        <div className="text-center py-20">
          <p className="font-mono text-red-400 mb-2">{error}</p>
          <p className="font-mono text-xs text-muted">
            Verifique sua conexão e tente novamente.
          </p>
        </div>
      )}

      {/* ── VAZIO ── */}
      {!loading && !error && (!projects || projects.length === 0) && (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="font-mono text-2xl mb-2">📁</p>
          <p className="font-mono text-muted">
            Nenhum projeto encontrado
            {activeFilter ? ` na categoria "${activeFilter}"` : ''}.
          </p>
          {activeFilter && (
            <button
              onClick={() => setActiveFilter(null)}
              className="font-mono text-accent text-sm mt-4 hover:underline"
            >
              limpar filtro
            </button>
          )}
        </div>
      )}

      {/* ── GRID DE PROJETOS ── */}
      {!loading && !error && projects && projects.length > 0 && (
        <>
          {/* Contador de resultados */}
          <p className="font-mono text-xs text-muted mb-6">
            {projects.length} projeto{projects.length !== 1 ? 's' : ''} encontrado{projects.length !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} hover glow>
                <Card.Header>
                  {/* Imagem do projeto se houver */}
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-36 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-mono text-lg font-bold text-text">
                      {project.title}
                    </h2>
                    {/* Badge de destaque */}
                    {project.featured && (
                      <span className="text-accent text-xs font-mono shrink-0">
                        ★ destaque
                      </span>
                    )}
                  </div>
                  <Badge
                    label={project.category}
                    variant={project.category}
                    size="sm"
                  />
                </Card.Header>

                <Card.Body>
                  {project.description}
                </Card.Body>

                <Card.Footer>
                  {/* Stack */}
                  <div className="flex flex-wrap gap-1 w-full mb-3">
                    {project.stack.map((tech) => (
                      <Badge key={tech} label={tech} size="sm" />
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 w-full">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1"
                      >
                        <Button variant="ghost" size="sm" className="w-full">
                          GitHub
                        </Button>
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1"
                      >
                        <Button variant="secondary" size="sm" className="w-full">
                          Demo ↗
                        </Button>
                      </a>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </>
      )}

    </main>
  )
}