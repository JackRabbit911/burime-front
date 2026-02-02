import { useEffect } from "react"
import { Link } from "react-router"
import { useList } from "effector-react"

import AuthorCard from "./AuthorCard"
import { $myAuthors, getMyAuthorsFx } from "../store"

const MyAuthors = () => {
  const myAuthors = useList($myAuthors, {
    fn: (author) => <AuthorCard author={author} />,
    placeholder: <h2>Здесь пока ничего нет</h2>
  })

  useEffect(() => {
    getMyAuthorsFx()
  }, [])

  return (
    <>
      <div className="text-end">
        <Link to='/author'>
          <button className="link">
            Create new author or group
          </button>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 h-auto">
        {myAuthors}
      </div>
    </>
  )
}

export default MyAuthors
