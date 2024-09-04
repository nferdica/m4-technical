import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css'; // Importa a fonte Roboto para uso global no projeto

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Seleciona o elemento 'root' no DOM para renderizar o aplicativo
);

root.render(
  <React.StrictMode>
    <App /> {/* Renderiza o componente principal 'App' dentro de 'React.StrictMode' para verificar possíveis problemas no código */}
  </React.StrictMode>
);
