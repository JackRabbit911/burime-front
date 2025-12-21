import { Route, Routes } from "react-router"
import Home from "."
import Books from "../Books/components"
import Branch from "../Branch/components"

const Router = () => {
  return (
    <Routes>
      <Route path='/my' element={<Home />} />
      <Route path='/my/books' element={<Books />} />
      <Route path='/my/branch/:id?' element={<Branch />} />
    </Routes>
  )
}

export default Router
