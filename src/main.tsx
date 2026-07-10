import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SectProvider } from './contexts/SectContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SectProvider>
      <App />
    </SectProvider>
  </StrictMode>,
)
