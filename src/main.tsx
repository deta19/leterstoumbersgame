import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import Bootstrap CSS and optional JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // optional, for components like modals/dropdowns

import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
