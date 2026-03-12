import { useEffect } from "react"
import { Link } from "react-router"
import { useList } from "effector-react"

import AuthorCard from "./AuthorCard"
import { $myAuthors, getMyAuthorsFx } from "../store"
import { useTranslate } from "common/i18n/hooks"

const MyAuthors = () => {
  const __ = useTranslate()

  const myAuthors = useList($myAuthors, {
    fn: (author) => <AuthorCard __={__} author={author} />,
    placeholder: <h2>Здесь пока ничего нет</h2>
  })


  useEffect(() => {
    getMyAuthorsFx()
  }, [])

  useTranslate()

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
        {myAuthors}
      </div>
    </>
  )
}

export default MyAuthors
