// src/hooks/useProjects.ts

import { useState, useEffect } from 'react'
import { getProjects, getFeaturedProjects } from '../lib/supabase'
import type { Project, ProjectCategory, ApiResponse } from '../types'

// ─────────────────────────────────────────
// OPÇÕES DO HOOK
// Permite configurar o comportamento ao usar o hook
// ─────────────────────────────────────────
interface UseProjectsOptions {
  // Se true, busca só os projetos em destaque
  featuredOnly?: boolean
  // Filtra por categoria se informado
  category?: ProjectCategory
}

// ─────────────────────────────────────────
// HOOK: useProjects
// Retorna projetos + estados de loading/erro
// Uso: const { data, loading, error } = useProjects()
// ─────────────────────────────────────────
export function useProjects(
  options: UseProjectsOptions = {}
): ApiResponse<Project[]> {
  const { featuredOnly = false, category } = options

  const [data, setData] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false // flag para evitar atualizar estado após desmontar

    async function fetchProjects() {
      setLoading(true)
      setError(null)

      try {
        // Escolhe qual função chamar baseado nas opções
        const result = featuredOnly
          ? await getFeaturedProjects()
          : await getProjects()

        // Se o componente foi desmontado enquanto aguardava,
        // não atualiza o estado (evita memory leak)
        if (cancelled) return

        // Filtra por categoria se a opção foi passada
        const filtered = category
          ? result.filter((p) => p.category === category)
          : result

        setData(filtered)
      } catch (err) {
        if (cancelled) return
        setError('Erro ao carregar projetos. Tente novamente.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProjects()

    // Cleanup: marca como cancelado quando o componente desmontar
    return () => {
      cancelled = true
    }
  // Roda novamente se as opções mudarem
  }, [featuredOnly, category])

  return { data, loading, error }
}