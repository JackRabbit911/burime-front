import { Link } from "react-router"
import { useUnit } from "effector-react"

import { $myStat } from "Home/store"
import MyBooksList from "./MyBooksList"
import { isOwnAuthors } from "Books/utils"
import { useTranslate } from "common/i18n/hooks"

const Books = () => {
  const stat = useUnit($myStat)
  const __ = useTranslate()

  return (
    <>
      <div className="text-end">
        {isOwnAuthors(stat) ?
          <Link to='/branch'>
            <button className="link">
              {__('Create new branch')}
            </button>
          </Link> :
          <Link to='/author'>
            <button className="link">
              {__('Create new author or group')}
            </button>
          </Link>
        }
      </div>
      <MyBooksList __={__} />
    </>
  )
}

export default Books
