import { Route, Routes } from "react-router"

import Home from "."
import Books from "Books/components"
import Branch from "Branch/components"
import Drafts from "Drafts/components"
import ErrorCmp from "reused/ErrorCmp"
import Profile from "Profile/components"
import List from "Message/components/List"
import MyAuthors from "MyAuthors/components"
import Password from "Profile/components/Password"
import MessageShow from "Message/components/MessageShow"
import AuthorWrapper from "MyAuthors/components/AuthorWrapper"
import MessageFormWrapper from "Message/components/Form/MessageFormWrapper"

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
      <Route path='profile' element={<Profile />} />
      <Route path='profile/password' element={<Password />} />
      <Route path='*' element={<ErrorCmp status={404} />} />
    </Routes>
  )
}

export default Router
