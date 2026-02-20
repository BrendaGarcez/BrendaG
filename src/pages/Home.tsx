// src/pages/Home.tsx

// A Home é simples — só organiza as seções na ordem certa
// Toda a lógica está dentro de cada seção
import Hero from '../components/sections/Hero'
import Terminal from '../components/sections/Terminal'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'

export default function Home() {
  return (
    // main semântico → importante para acessibilidade e SEO
    <main>
      {/* 1. Hero — primeira coisa que o recrutador vê */}
      <Hero />

      {/* 2. Projetos em destaque — mostrar valor rápido */}
      <Projects />

      {/* 3. Terminal interativo — diferencial do portfólio */}
      <Terminal />

      {/* 4. Skills — habilidades técnicas */}
      <Skills />
    </main>
  )
}