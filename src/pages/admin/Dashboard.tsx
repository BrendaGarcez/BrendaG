// src/pages/admin/Dashboard.tsx

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { createProject, deleteProject } from '../../lib/supabase'
import type { ProjectCategory } from '../../types'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'

// ─────────────────────────────────────────
// ESTADO INICIAL DO FORMULÁRIO
// Separado para facilitar o reset após criar
// ─────────────────────────────────────────
const emptyForm = {
  title: '',
  description: '',
  long_description: '',
  stack: '',         // string separada por vírgula → vira array ao salvar
  category: 'devops' as ProjectCategory,
  github_url: '',
  demo_url: '',
  image_url: '',
  featured: false,
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()

  // Proteção de rota — se não autenticado, manda pro login
  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin')
    }
  }, [user, loading, navigate])

  // Busca todos os projetos para listar no dashboard
  const { data: projects, loading: loadingProjects } = useProjects()

  // Estado do formulário de criação
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Controla qual aba está ativa
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list')

  // ─────────────────────────────────────────
  // Handler genérico para inputs do formulário
  // Atualiza o campo pelo name do input
  // ─────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    setForm((prev) => ({
      ...prev,
      // Para checkbox, usa checked ao invés de value
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(false)

    // Validações
    if (!form.title.trim()) {
      setFormError('O título é obrigatório.')
      return
    }
    if (!form.description.trim()) {
      setFormError('A descrição é obrigatória.')
      return
    }
    if (!form.stack.trim()) {
      setFormError('Informe pelo menos uma tecnologia.')
      return
    }

    setIsSubmitting(true)

    // Converte a string de stack em array
    // Ex: "Docker, Python, Bash" → ['Docker', 'Python', 'Bash']
    const stackArray = form.stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const result = await createProject({
      title: form.title,
      description: form.description,
      long_description: form.long_description || undefined,
      stack: stackArray,
      category: form.category,
      github_url: form.github_url || undefined,
      demo_url: form.demo_url || undefined,
      image_url: form.image_url || undefined,
      featured: form.featured,
    })

    setIsSubmitting(false)

    if (!result) {
      setFormError('Erro ao criar projeto. Tente novamente.')
      return
    }

    // Sucesso — reseta o form e mostra feedback
    setForm(emptyForm)
    setFormSuccess(true)
    setTimeout(() => setFormSuccess(false), 3000)
  }

  const handleDelete = async (id: string, title: string) => {
    // Confirmação antes de deletar
    if (!confirm(`Deletar "${title}"? Essa ação não pode ser desfeita.`)) return

    await deleteProject(id)
    // O hook useProjects vai rebuscar automaticamente
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-mono text-muted animate-pulse">carregando...</span>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">

      {/* ── CABEÇALHO ── */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-accent text-sm mb-1">
            <span className="text-muted">$ </span>sudo dashboard
          </p>
          <h1 className="font-mono text-2xl font-bold text-text">
            painel administrativo
          </h1>
          <p className="font-mono text-xs text-muted mt-1">
            logado como {user?.email}
          </p>
        </div>

        <Button variant="danger" size="sm" onClick={signOut}>
          sair ↗
        </Button>
      </div>

      {/* ── ABAS ── */}
      <div className="flex gap-2 mb-8 border-b border-border pb-4">
        {[
          { key: 'list', label: `projetos (${projects?.length ?? 0})` },
          { key: 'new',  label: '+ novo projeto' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'list' | 'new')}
            className={`
              font-mono text-sm px-4 py-2 rounded-lg transition-all
              ${activeTab === tab.key
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'text-muted hover:text-text hover:bg-surface border border-transparent'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── ABA: LISTA DE PROJETOS ── */}
      {activeTab === 'list' && (
        <div>
          {loadingProjects && (
            <p className="font-mono text-muted animate-pulse">
              carregando projetos...
            </p>
          )}

          {!loadingProjects && (!projects || projects.length === 0) && (
            <div className="text-center py-16 border border-dashed border-border rounded-xl">
              <p className="font-mono text-muted mb-2">Nenhum projeto ainda.</p>
              <button
                onClick={() => setActiveTab('new')}
                className="font-mono text-accent text-sm hover:underline"
              >
                criar primeiro projeto →
              </button>
            </div>
          )}

          <div className="space-y-4">
            {projects?.map((project) => (
              <Card key={project.id}>
                <div className="flex items-start justify-between gap-4">

                  {/* Info do projeto */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-mono font-bold text-text">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="font-mono text-xs text-accent">
                          ★ destaque
                        </span>
                      )}
                      <Badge
                        label={project.category}
                        variant={project.category}
                        size="sm"
                      />
                    </div>

                    <p className="font-mono text-xs text-muted mb-3">
                      {project.description}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1">
                      {project.stack.map((tech) => (
                        <Badge key={tech} label={tech} size="sm" />
                      ))}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 shrink-0">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="sm">GitHub</Button>
                      </a>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title)}
                    >
                      deletar
                    </Button>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── ABA: NOVO PROJETO ── */}
      {activeTab === 'new' && (
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Título */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                título *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Pipeline CI/CD com GitHub Actions"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Descrição curta */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                descrição curta *
              </label>
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Uma linha resumindo o projeto"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Descrição longa */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                descrição detalhada
              </label>
              <textarea
                name="long_description"
                value={form.long_description}
                onChange={handleChange}
                rows={4}
                placeholder="Contexto, desafios, soluções..."
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>

            {/* Stack */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                stack * <span className="text-muted">(separada por vírgula)</span>
              </label>
              <input
                name="stack"
                value={form.stack}
                onChange={handleChange}
                placeholder="Docker, Python, GitHub Actions"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                categoria *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
              >
                <option value="devops">devops</option>
                <option value="backend">backend</option>
                <option value="frontend">frontend</option>
                <option value="automation">automation</option>
                <option value="fullstack">fullstack</option>
              </select>
            </div>

            {/* Links — grid de 2 colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-accent block mb-2">
                  github url
                </label>
                <input
                  name="github_url"
                  value={form.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-accent block mb-2">
                  demo url
                </label>
                <input
                  name="demo_url"
                  value={form.demo_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            {/* URL da imagem */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                url da imagem
              </label>
              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://... (screenshot do projeto)"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Destaque */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-green-400"
              />
              <label htmlFor="featured" className="font-mono text-sm text-text cursor-pointer">
                exibir na home como destaque
              </label>
            </div>

            {/* Feedback de erro */}
            {formError && (
              <div className="rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-3">
                <p className="font-mono text-xs text-red-400">✗ {formError}</p>
              </div>
            )}

            {/* Feedback de sucesso */}
            {formSuccess && (
              <div className="rounded-lg border border-green-700/50 bg-green-900/20 px-4 py-3">
                <p className="font-mono text-xs text-green-400">
                  ✓ Projeto criado com sucesso!
                </p>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'salvando...' : 'criar projeto →'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setForm(emptyForm)}
              >
                limpar
              </Button>
            </div>

          </form>
        </div>
      )}

    </main>
  )
}