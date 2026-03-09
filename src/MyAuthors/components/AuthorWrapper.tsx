import { useEffect } from "react"
import { useUnit } from "effector-react"
import { useParams } from "react-router"

import AuthorFormWrapper from "./AuthorFormWrapper"
import { $myAuthors, getMyAuthorsFx, getMyMembersFx } from "../store"
import ErrorCmp from "reused/ErrorCmp"

const AuthorWrapper = () => {
  const { id } = useParams()
  const authors = useUnit($myAuthors)
  const author = authors.filter((item) => item.id === Number(id))[0]
  
  useEffect(() => {
    if (id && !author) {
      getMyAuthorsFx()
    }
    
    getMyMembersFx(id)
  }, [])
  
  if (id && !authors.some(obj => String(obj.id) == id)) {
    return <ErrorCmp status={404} />
  }

  return author ? <AuthorFormWrapper defaultAuthor={author} /> :
    ( id ? null : <AuthorFormWrapper />)
}

export default AuthorWrapper
