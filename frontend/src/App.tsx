import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ToastContainer } from 'react-toastify'; // Importa o ToastContainer para exibir mensagens de toast
import 'react-toastify/dist/ReactToastify.css'; // Estilos do react-toastify
import Header from './components/Header'; // Componente do cabeçalho
import Login from './pages/Login/Login'; // Página de login
import Register from './pages/Register/Register'; // Página de registro
import Home from './pages/Home/Home'; // Página inicial
import Dashboard from './pages/Dashboard/Dashboard'; // Dashboard principal
import InfluencerForm from './pages/Influencer/InfluencerForm'; // Formulário de criação de influenciador
import InfluencerList from './pages/Influencer/InfluencerList'; // Lista de influenciadores
import InfluencerDetail from './pages/Influencer/InfluencerDetail'; // Detalhes do influenciador
import EditInfluencer from './pages/Influencer/EditInfluencer'; // Edição de influenciador
import BrandForm from './pages/Brand/BrandForm'; // Formulário de criação de marca
import BrandList from './pages/Brand/BrandList'; // Lista de marcas
import BrandDetail from './pages/Brand/BrandDetail'; // Detalhes de marca
import EditBrand from './pages/Brand/EditBrand'; // Edição de marca
import AssociateInfluencer from './pages/Associate/AssociateInfluencer'; // Associação entre influenciador e marca
import InfluencerSearch from './pages/Influencer/InfluencerSearch'; // Busca de influenciadores
import PrivateRoute from './components/PrivateRoute'; // Componente para proteger rotas privadas

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Reset de CSS para garantir consistência visual */}
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#1F1E2E', // Cor de fundo da aplicação
            color: '#FFFFFF', // Cor do texto padrão
            margin: 0,
            padding: 0,
            fontFamily: 'Roboto, sans-serif', // Fonte global
          },
        }}
      />
      <Header /> {/* Componente de cabeçalho sempre visível */}
      <Routes>
        {/* Rotas de acesso público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas protegidas por login */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
        {/* Rotas para gerenciamento de influenciadores */}
        <Route path="/influencers" element={<PrivateRoute><InfluencerList /></PrivateRoute>} />
        <Route path="/influencers/new" element={<PrivateRoute><InfluencerForm /></PrivateRoute>} />
        <Route path="/influencers/:id" element={<PrivateRoute><InfluencerDetail /></PrivateRoute>} />
        <Route path="/influencers/edit/:id" element={<PrivateRoute><EditInfluencer /></PrivateRoute>} />
        <Route path="/influencers/search" element={<PrivateRoute><InfluencerSearch /></PrivateRoute>} />
        
        {/* Rotas para gerenciamento de marcas */}
        <Route path="/brands" element={<PrivateRoute><BrandList /></PrivateRoute>} />
        <Route path="/brands/new" element={<PrivateRoute><BrandForm /></PrivateRoute>} />
        <Route path="/brands/:id" element={<PrivateRoute><BrandDetail /></PrivateRoute>} />
        <Route path="/brands/edit/:id" element={<PrivateRoute><EditBrand /></PrivateRoute>} />
        <Route path="/brands/associate/:id" element={<PrivateRoute><AssociateInfluencer /></PrivateRoute>} />
      </Routes>
      
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      /> {/* Configurações do ToastContainer para exibir mensagens de notificação */}
    </Router>
  );
}

export default App;

