import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadForm from './pages/LeadForm';

/**
 * Define as rotas principais da aplicação. Esta estrutura simplificada
 * demonstra a navegação entre login, dashboard e páginas de formulário
 * de leads. A autenticação de rotas deverá ser implementada em um
 * próximo passo.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form/:id" element={<LeadForm />} />
      </Routes>
    </Router>
  );
}

export default App;