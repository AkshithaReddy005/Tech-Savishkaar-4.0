import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ResultsPage from './pages/ResultsPage'
import './theme.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ResultsPage />
    </BrowserRouter>
  </React.StrictMode>,
)
