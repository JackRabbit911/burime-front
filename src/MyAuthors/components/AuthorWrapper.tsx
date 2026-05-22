import { useEffect } from "react"
import { useUnit } from "effector-react"
import { useParams } from "react-router"

import ErrorCmp from "reused/ErrorCmp"
import AuthorFormWrapper from "./AuthorFormWrapper"
import { $myAuthors, getMyAuthorsFx, getMyMembersFx } from "../store"
import { $ownAuthors, getOwnAuthorsFx } from "common/store/ownAuthors"

const AuthorWrapper = () => {
  const { id } = useParams()
  const authors = useUnit($myAuthors)
  const ownAuthors = useUnit($ownAuthors)
  const author = authors.filter((item) => item.id === Number(id))[0]
  
  useEffect(() => {
    if (id && !author) {
      getMyAuthorsFx()
    }
    
    getMyMembersFx(id)

    if (ownAuthors.length === 0) {
      getOwnAuthorsFx()
    }
  }, [])
  
  if (id && !authors.some(obj => String(obj.id) == id)) {
    return <ErrorCmp status={404} />
  }

  return <AuthorFormWrapper defaultAuthor={author} />
}

export default AuthorWrapper
