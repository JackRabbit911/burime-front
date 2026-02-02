import { BrowserRouter } from "react-router"

import Modal from "./reused/Modal";
import Router from "./Home/components/Router"
import Wrapper from "./Home/components/Wrapper"

function App() {
  const prefix = () => {
    const lang = document.querySelector('html')?.getAttribute('lang');

    return (lang === 'ru') ? '/my' : `/${lang}/my`
  }

  return (
    <BrowserRouter basename={prefix()}>
      <Wrapper>
        <Router />
      </Wrapper>
      <Modal />
    </BrowserRouter>
  )
}

export default App
