import { Route, Routes } from "react-router"
import Home from "."
import Books from "../Books/components"

const Router = () => {
  return (
    <Routes>
      <Route path='/my' element={<Home />} />
      <Route path='/my/books' element={<Books />} />
    </Routes>
  )
}

export default Router
