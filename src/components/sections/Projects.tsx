// src/components/sections/Projects.tsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProjects } from '../../lib/supabase'
import type { Project } from '../../types'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function Projects() {
  // Estado para os projetos vindos do Supabase
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Busca os projetos em destaque ao montar o componente
  // [] como dependência → roda só uma vez
  useEffect(() => {
    async function load() {
      try {
        const data = await getFeaturedProjects()
        setProjects(data)
      } catch {
        setError('Erro ao carregar projetos.')
      } finally {
        // finally roda sempre, com erro ou sem
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">

        {/* ── TÍTULO ── */}
        <div className="mb-12 text-center">
          <p className="font-mono text-accent text-sm mb-2">
            <span className="text-muted">$ </span>ls ./projects --featured
          </p>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-text">
            projetos em destaque
          </h2>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skeleton cards enquanto carrega */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface p-6 animate-pulse"
              >
                <div className="h-4 bg-border rounded w-3/4 mb-4" />
                <div className="h-3 bg-border rounded w-full mb-2" />
                <div className="h-3 bg-border rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {error && (
          <div className="text-center py-12">
            <p className="font-mono text-red-400">{error}</p>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="font-mono text-muted">
              Nenhum projeto em destaque ainda.
            </p>
            <p className="font-mono text-xs text-muted mt-2">
              Adicione projetos pelo painel admin!
            </p>
          </div>
        )}

        {/* ── PROJETOS ── */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} hover glow>
                <Card.Header>
                  <h3 className="font-mono text-lg font-bold text-text mb-1">
                    {project.title}
                  </h3>
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
                  {/* Stack como badges */}
                  <div className="flex flex-wrap gap-1 w-full mb-3">
                    {project.stack.map((tech) => (
                      <Badge key={tech} label={tech} size="sm" />
                    ))}
                  </div>

                  {/* Links do projeto */}
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
        )}

        {/* ── BOTÃO VER TODOS ── */}
        <div className="text-center mt-12">
          <Link to="/projetos">
            <Button variant="secondary" size="lg">
              ver todos os projetos →
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}