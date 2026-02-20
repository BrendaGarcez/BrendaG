// src/lib/supabase.ts

// createClient é a função que cria a conexão com o Supabase
import { createClient } from '@supabase/supabase-js'

// import.meta.env é como o Vite acessa variáveis de ambiente
// É equivalente ao process.env do Node.js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validação: se as variáveis não existirem, avisa o dev imediatamente
// Melhor do que deixar quebrar silenciosamente em outro lugar
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não encontradas. Verifique o arquivo .env'
  )
}

// Cria e exporta o cliente
// Esse objeto "supabase" é o que você vai usar em todo o projeto
// para fazer queries, auth, storage, etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─────────────────────────────────────────
// FUNÇÕES AUXILIARES
// Centraliza as queries para não repetir código
// ─────────────────────────────────────────

import type { Project } from '../types'

// Busca todos os projetos ordenados por data
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')           // tabela
    .select('*')                // todas as colunas
    .order('created_at', { ascending: false }) // mais recentes primeiro

  // Se der erro, loga e retorna array vazio (não quebra a UI)
  if (error) {
    console.error('Erro ao buscar projetos:', error.message)
    return []
  }

  // data pode ser null se não houver registros, então retornamos []
  return data ?? []
}

// Busca só os projetos em destaque (para a home)
export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)   // .eq = WHERE featured = true
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar projetos em destaque:', error.message)
    return []
  }

  return data ?? []
}

// Insere um novo projeto (só funciona se autenticado)
export async function createProject(
  project: Omit<Project, 'id' | 'created_at'> // Omit remove campos que o banco gera
): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()  // retorna o registro inserido
    .single()  // espera um único resultado

  if (error) {
    console.error('Erro ao criar projeto:', error.message)
    return null
  }

  return data
}

// Deleta um projeto pelo id
export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar projeto:', error.message)
    return false
  }

  return true
}