import { BrowserRouter } from "react-router"

import Modal from "./reused/Modal";
import Router from "./Home/components/Router"
import Wrapper from "./Home/components/Wrapper"
import TranslateProvider from "common/i18n/TranslateProvider";
import { detectLang } from "common/i18n/utils";

function App() {
  const prefix = () => {
    const lang = detectLang()

    return (lang === 'ru') ? '/my' : `/${lang}/my`
  }

  return (
    <BrowserRouter basename={prefix()}>
      <TranslateProvider>
        <Wrapper>
          <Router />
        </Wrapper>
        <Modal />
      </TranslateProvider>
    </BrowserRouter>
  )
}

export default App
