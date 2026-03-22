import { useEffect } from "react"
import { Link } from "react-router"
import { useUnit } from "effector-react"

import AuthorCard from "./AuthorCard"
import { $myAuthors, getMyAuthorsFx } from "../store"
import { useTranslate } from "common/i18n/hooks"

const MyAuthors = () => {
  const myAuthors = useUnit($myAuthors)
  const __ = useTranslate()

  useEffect(() => {
    getMyAuthorsFx()
  }, [])

  return (
    <>
      <div className="text-end">
        <Link to='/author'>
          <button className="link">
            {__('Create new author or group')}
          </button>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 h-auto">
        {myAuthors.map((author, key) => <AuthorCard key={key} author={author} __={__} />)}
      </div>
    </>
  )
}

export default MyAuthors
