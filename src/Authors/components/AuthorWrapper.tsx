import { useUnit } from "effector-react"
import { useParams } from "react-router"
import { $myAuthors, getMyAuthorsFx } from "../store"
import { useEffect } from "react"
import AuthorForm from "./AuthorForm"

const AuthorFormWrapper = () => {
  const { id } = useParams()
  const authors = useUnit($myAuthors)
  const author = authors.filter((item) => item.id === Number(id))[0]

   useEffect(() => {
    if (id && !author) {
      getMyAuthorsFx()
    }
  }, [])

  return author ? <AuthorForm author={author} /> :
    ( id ? null : <AuthorForm />)
}

export default AuthorFormWrapper
