import { useUnit } from "effector-react"
import { useParams } from "react-router"
import { $myAuthors, getMyAuthorsFx } from "../store"
import { useEffect } from "react"
import AuthorFormWrapper from "./AuthorFormWrapper"

const AuthorWrapper = () => {
  const { id } = useParams()
  const authors = useUnit($myAuthors)
  const author = authors.filter((item) => item.id === Number(id))[0]

   useEffect(() => {
    if (id && !author) {
      getMyAuthorsFx()
    }
  }, [])

  return author ? <AuthorFormWrapper author={author} /> :
    ( id ? null : <AuthorFormWrapper />)
}

export default AuthorWrapper
