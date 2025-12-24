import { Route, Routes } from "react-router"
import Home from "."
import Books from "../Books/components"
import Branch from "../Branch/components"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='books' element={<Books />} />
      <Route path='drafts' element={<Books />} />
      <Route path='branch/:id?/:draft?' element={<Branch />} />
    </Routes>
  )
}

export default Router
