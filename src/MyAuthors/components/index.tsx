import { useEffect } from "react"
import { Link } from "react-router"
import { useList, useUnit } from "effector-react"

import AuthorCard from "./AuthorCard"
import { useTranslate } from "common/i18n/hooks"
import ErrorOrPending from "reused/ErrorOrPendig"
import { $isPending, $myAuthors, getMyAuthorsFx } from "../store"

const MyAuthors = () => {
  const isLoading = useUnit($isPending)
  const __ = useTranslate()
  const myAuthors = useList($myAuthors, {
    fn: (author) => <AuthorCard author={author} __={__} />,
    placeholder: __("There's nothing here yet")
  })

  useEffect(() => {
    getMyAuthorsFx()
  }, [])

  return (
    <ErrorOrPending isLoading={isLoading}>
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
    </ErrorOrPending>
  )
}

export default MyAuthors
