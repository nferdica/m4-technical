import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/influencers">Gerenciar Influenciadores</Link></li>
          <li><Link to="/metrics">Ver Métricas</Link></li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </nav>
      
      <section>
        <h2>Resumo</h2>
        <p>Número de influenciadores: 100</p>
        <p>Campanhas ativas: 20</p>
        {/* Você pode adicionar gráficos e outras informações aqui */}
      </section>
    </div>
  );
};

export default Dashboard;
