import { useUnit } from "effector-react"
import { useEffect } from "react"
import { $total1, getAuthorsFx } from "../store/authors";
import Paginator from "../../Paginator";
import PerPage from "../../Paginator/PerPage";
import { perPages } from "../../../common/constants";
import { $authorsPayload, limitSet, pageSet } from "../store/athorsPayload";

const Pagination = () => {
  const total = useUnit($total1)
  const authorsPayload = useUnit($authorsPayload)

  const setPage = (page: number) => {
    pageSet(page)
  }

  const setLimit = (limit: number) => {
    limitSet(limit)
  }

  useEffect(() => {
    getAuthorsFx(authorsPayload)
  }, [authorsPayload])

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
