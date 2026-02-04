import { useEffect } from "react"
import { useList } from "effector-react"

import CoverWrapper from "./CoverWrapper"
import { $myBooks, getMyBooksFx } from "Books/store"
import Cover from "reused/Cover"

const MyBooksList = () => {
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

  return myBooks
}

export default MyBooksList
