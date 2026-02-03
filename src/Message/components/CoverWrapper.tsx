import { useEffect } from "react"
import { useUnit } from "effector-react"

import Cover from "../../reused/Cover"
import { $cover, getCoverFx } from "common/store/cover"

import type { MyBook } from "common/types/cover"

type Props = {
  branchId: string;
}

const CoverWrapper = ({ branchId }: Props) => {
  const cover = useUnit($cover)

  useEffect(() => {
    getCoverFx(branchId)
  }, [])

  if (!cover) {
    return null
  }
  
  return <Cover book={cover as MyBook} />
}

export default CoverWrapper
