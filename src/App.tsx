import Modal from "./reused/Modal";
import Router from "./Home/components/Router"
import { useDeps } from "common/i18n/useDeps";
import Wrapper from "./Home/components/Wrapper"
import TranslateProvider from "common/i18n/TranslateProvider";

function App() {
  const deps = useDeps()

  return (
    <TranslateProvider deps={deps}>
      <Wrapper>
        <Router />
      </Wrapper>
      <Modal />
    </TranslateProvider>
  )
}

export default App
