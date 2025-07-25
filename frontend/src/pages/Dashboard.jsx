import React from 'react';

/**
 * Página de dashboard simplificada. Este componente servirá
 * como a base para exibir métricas e gráficos. No futuro,
 * integrará chamadas à API para carregar leads e estatísticas.
 */
function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Placeholder para cards resumidos */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold">Leads Hoje</h2>
          <p className="text-2xl">0</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold">Leads Semana</h2>
          <p className="text-2xl">0</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold">Taxa de Conversão</h2>
          <p className="text-2xl">0%</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold">ROI do Mês</h2>
          <p className="text-2xl">R$ 0,00</p>
        </div>
      </div>
      {/* Placeholder para gráficos e tabela de leads */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Leads Recentes</h2>
        <p>Ainda não há leads cadastrados.</p>
      </div>
    </div>
  );
}

export default Dashboard;