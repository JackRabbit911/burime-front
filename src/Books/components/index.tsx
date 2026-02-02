import { Link } from "react-router"
import { useUnit } from "effector-react"

import { $myStat } from "Home/store"
import MyBooksList from "./MyBooksList"
import { isOwnAuthors } from "Books/utils"

const Books = () => {
  const stat = useUnit($myStat)

  return (
    <>
      <div className="text-end">
        {isOwnAuthors(stat) ?
          <Link to='/branch'>
            <button className="link">
              Create new branch
            </button>
          </Link> :
          <Link to='/author'>
            <button className="link">
              Create new author or group
            </button>
          </Link>
        }
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 h-auto">
        <MyBooksList />
      </div>
    </>
  )
}

export default Books
