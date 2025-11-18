import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import RecipeCotext from './Context/RecipeCotext.jsx'

createRoot(document.getElementById('root')).render(
  <RecipeCotext>
    <BrowserRouter>
      <App />
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  </RecipeCotext>
)
