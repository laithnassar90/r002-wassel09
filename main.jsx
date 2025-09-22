import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from '../containers/Root.dev.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
