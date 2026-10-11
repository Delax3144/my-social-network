import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from "./components/Header/Header";
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
)
