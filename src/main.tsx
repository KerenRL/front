import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { navigationWrapper } from './core/navigation/NavigationWrapper'; // Asegúrate de que este archivo exista
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={navigationWrapper} />
  </StrictMode>,
);
