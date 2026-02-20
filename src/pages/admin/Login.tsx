// src/pages/admin/Login.tsx

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Hook de autenticação que criamos na Fase 6
  const { user, loading, signIn } = useAuth()

  // useNavigate: permite redirecionar programaticamente
  const navigate = useNavigate()

  // Se já está autenticado, manda direto pro dashboard
  // Evita que o admin acesse a tela de login desnecessariamente
  useEffect(() => {
    if (!loading && user) {
      navigate('/admin/dashboard')
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    // Previne o comportamento padrão do form (recarregar a página)
    e.preventDefault()

    // Validação básica antes de chamar a API
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }

    setIsLoading(true)
    setError(null)

    // signIn retorna null se ok, ou string de erro se falhou
    const errorMessage = await signIn(email, password)

    if (errorMessage) {
      setError(errorMessage)
      setIsLoading(false)
    }
    // Se ok, o useEffect acima detecta o user e redireciona
  }

  // Enquanto verifica a sessão, não renderiza nada
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-mono text-muted animate-pulse">
          verificando sessão...
        </span>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* ── CABEÇALHO ── */}
        <div className="text-center mb-8">
          <p className="font-mono text-accent text-sm mb-2">
            <span className="text-muted">$ </span>sudo su
          </p>
          <h1 className="font-mono text-2xl font-bold text-text">
            acesso administrativo
          </h1>
          <p className="font-mono text-xs text-muted mt-2">
            área restrita — somente para a Brenda
          </p>
        </div>

        {/* ── FORMULÁRIO ── */}
        <div className="rounded-xl border border-border bg-surface p-8">

          {/* Barra de título estilo terminal */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-muted">
              admin@brendag ~ login
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Campo email */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="
                  w-full bg-bg border border-border rounded-lg
                  px-4 py-3 font-mono text-sm text-text
                  placeholder:text-muted
                  focus:outline-none focus:border-accent/50
                  transition-colors
                "
              />
            </div>

            {/* Campo senha */}
            <div>
              <label className="font-mono text-xs text-accent block mb-2">
                senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full bg-bg border border-border rounded-lg
                  px-4 py-3 font-mono text-sm text-text
                  placeholder:text-muted
                  focus:outline-none focus:border-accent/50
                  transition-colors
                "
              />
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-3">
                <p className="font-mono text-xs text-red-400">
                  ✗ {error}
                </p>
              </div>
            )}

            {/* Botão de submit */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'autenticando...' : 'entrar →'}
            </Button>

          </form>
        </div>

      </div>
    </main>
  )
}