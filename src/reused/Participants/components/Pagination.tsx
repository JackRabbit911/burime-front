import { useUnit } from "effector-react"

import Paginator from "reused/Paginator";
import { $total } from "../store/authors";
import { perPages } from "common/constants";
import PerPage from "reused/Paginator/PerPage";
import { $authorsPayload, limitSet, pageSet } from "../store/athorsPayload";

const Pagination = () => {
  const total = useUnit($total)
  const authorsPayload = useUnit($authorsPayload)

  const setPage = (page: number) => {
    pageSet(page)
  }

  const setLimit = (limit: number) => {
    limitSet(limit)
  }

  return (
    <div className="flex justify-between mt-2">
      <Paginator
        total={total}
        page={authorsPayload.page}
        limit={authorsPayload.limit}
        setPage={setPage}
      />
      <PerPage
        perPages={perPages}
        limit={authorsPayload.limit}
        setPerPage={setLimit}
      />
    </div>
  )
}

export default Pagination
