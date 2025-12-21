import { useList } from "effector-react"
import { $myBooks, getMyBooksFx } from "../store"
import { useEffect } from "react"
import Cover from "./Cover"
import CoverWrapper from "./CoverWrapper"

const Books = () => {
  const myBooks = useList($myBooks, {
    fn: (book) => (
      <CoverWrapper role={book.myRole}>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 h-auto">
        {myBooks}
      </div>
    </>
  )
}

export default Books
