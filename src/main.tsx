import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { detectLang } from 'common/i18n/config.ts'

const prefix = () => {
    const lang = detectLang()

    return (lang === 'ru') ? '/my' : `/${lang}/my`
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={prefix()}>
        <App />
    </BrowserRouter>
)
