import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

const prefix = '/my'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={prefix}>
        <App />
    </BrowserRouter>
)
