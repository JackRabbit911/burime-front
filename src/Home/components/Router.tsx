import { Route, Routes } from "react-router"
import Home from "."
import Books from "../../Books/components"
import Branch from "../../Branch/components"
import Drafts from "../../Drafts/components"
import MyAuthors from "../../MyAuthors/components"
import AuthorWrapper from "../../MyAuthors/components/AuthorWrapper"
import List from "../../Message/components/List"
import MessageShow from "../../Message/components/MessageShow"
import MessageFormWrapper from "../../Message/components/Form/MessageFormWrapper"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='books' element={<Books />} />
      <Route path='authors' element={<MyAuthors />} />
      <Route path='message'>
        <Route path='inbox' element={<List box='inbox' />} />
        <Route path='outbox' element={<List box='outbox' />} />
        <Route path='deleted' element={<List box='deleted' />} />
        <Route path='in/:id' element={<MessageShow cond='in'/>} />
        <Route path='out/:id' element={<MessageShow cond='out'/>} />
        <Route path='del/:id' element={<MessageShow cond='del'/>} />
        <Route path='form' element={<MessageFormWrapper />} />
      </Route>
      <Route path='drafts' element={<Drafts />} />
      <Route path='branch/:id?/:draft?' element={<Branch />} />
      <Route path='author/:id?' element={<AuthorWrapper />} />
    </Routes>
  )
}

export default Router
