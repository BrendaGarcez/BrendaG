// src/App.tsx

// BrowserRouter: usa o histórico do navegador para navegação (URL normal)
// Routes: container que agrupa todas as rotas
// Route: define um caminho (path) e o componente que ele renderiza
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importando as páginas que vamos criar nas próximas fases
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import About from './pages/About'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'

// Importando o layout que envolve todas as páginas
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    // BrowserRouter precisa envolver tudo que usa navegação
    <BrowserRouter>

      {/* Navbar aparece em todas as páginas */}
      <Navbar />

      {/* Routes renderiza APENAS a rota que combina com a URL atual */}
      <Routes>

        {/* path="/" → página inicial */}
        <Route path="/" element={<Home />} />

        {/* path="/projetos" → lista de projetos */}
        <Route path="/projetos" element={<ProjectsPage />} />

        {/* path="/sobre" → página sobre você */}
        <Route path="/sobre" element={<About />} />

        {/* Rotas da área administrativa */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

      </Routes>

      {/* Footer aparece em todas as páginas */}
      <Footer />

    </BrowserRouter>
  )
}

// Export default: permite importar esse componente sem chaves {}
// Ex: import App from './App' ✅
// Se fosse named export seria: import { App } from './App'
export default App