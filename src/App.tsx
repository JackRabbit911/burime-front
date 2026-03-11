import { BrowserRouter } from "react-router"

import Modal from "./reused/Modal";
import Router from "./Home/components/Router"
import Wrapper from "./Home/components/Wrapper"
import TranslateProvider from "common/i18n/TranslateProvider";

function App() {
  const prefix = () => {
    const lang = document.querySelector('html')?.getAttribute('lang');

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
