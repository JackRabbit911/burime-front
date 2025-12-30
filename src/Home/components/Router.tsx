import { Route, Routes } from "react-router"
import Home from "."
import Books from "../../Books/components"
import Branch from "../../Branch/components"
import Drafts from "../../Drafts/components"
import MyAuthors from "../../MyAuthors/components"
import AuthorWrapper from "../../MyAuthors/components/AuthorWrapper"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='books' element={<Books />} />
      <Route path='authors' element={<MyAuthors />} />
      <Route path='drafts' element={<Drafts />} />
      <Route path='branch/:id?/:draft?' element={<Branch />} />
      <Route path='author/:id?' element={<AuthorWrapper />} />
    </Routes>
  )
}

export default Router
