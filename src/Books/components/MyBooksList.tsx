import { useEffect } from "react"
import { useList, useUnit } from "effector-react"

import Cover from "reused/Cover"
import { $status } from "common/store"
import CoverWrapper from "./CoverWrapper"
import ErrorOrPending from "reused/ErrorOrPendig"
import { $isPending, $myBooks, getMyBooksFx } from "Books/store"

import type { GetTextProp } from "common/i18n/types"

const MyBooksList = ({ __ }: GetTextProp) => {
  const [status, isLoadind] = useUnit([$status, $isPending])
  const myBooks = useList($myBooks, {
    fn: (book) => (
      <CoverWrapper
        id={book.id}
        role={book.myRole}>
        <Cover book={book} />
      </CoverWrapper>
    ),
    placeholder: __("There's nothing here yet")
  })

  useEffect(() => {
    getMyBooksFx()
  }, [])

  return (
    <ErrorOrPending status={status} isLoading={isLoadind}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 h-auto">
        {myBooks}
      </div>
    </ErrorOrPending>
  )
}

export default MyBooksList
