import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { UserProvider } from './contexts/UserContext'
import AuthGuard from './components/AuthGuard'
import VariantA from './VariantA'
import VariantB from './VariantB'
import VariantC from './VariantC'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <AuthGuard>
          <Routes>
            <Route path="/" element={<VariantA />} />
            <Route path="/variant-b" element={<VariantB />} />
            <Route path="/variant-c" element={<VariantC />} />
          </Routes>
        </AuthGuard>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
