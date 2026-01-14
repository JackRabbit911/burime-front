import { useList, useUnit } from "effector-react"
import { $myBooks, getMyBooksFx } from "../store"
import { useEffect } from "react"
import Cover from "./Cover"
import CoverWrapper from "./CoverWrapper"
import { Link } from "react-router"
import { $myStat } from "../../Home/store"
import { isOwnAuthors } from "../utils"

const Books = () => {
  const stat = useUnit($myStat)

  const myBooks = useList($myBooks, {
    fn: (book) => (
      <CoverWrapper
        id={book.id}
        role={book.myRole}>
        <Cover book={book} />
      </CoverWrapper>
    ),
    placeholder: <h2>Здесь пока ничего нет</h2>
  })

  useEffect(() => {
    getMyBooksFx()
  }, [])

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
        {myBooks}
      </div>
    </>
  )
}

export default Books
