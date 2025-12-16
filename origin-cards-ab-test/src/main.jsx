import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import VariantB from './VariantB.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/FSDmodugno-testing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/explore" element={<VariantB />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
