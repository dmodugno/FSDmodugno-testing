import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { UserProvider } from './contexts/UserContext'
import VariantA from './VariantA'
import VariantB from './VariantB'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<VariantA />} />
          <Route path="/variant-b" element={<VariantB />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
