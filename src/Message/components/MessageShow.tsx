import { useEffect } from "react"
import { useParams } from "react-router"
import { useUnit } from "effector-react"

import { $status } from "common/store"
import MsgShowWrapper from "./WsgShowWrappper"
import ErrorOrPending from "reused/ErrorOrPendig"
import { $isPending, $message, getMessageFx } from "../store"

const MessageShow = () => {
  const { id } = useParams()
  const message = useUnit($message)
  const [status, isLoading] = useUnit([$status, $isPending])

  useEffect(() => {
    getMessageFx(id as string)
  }, [])

  return (
    <ErrorOrPending status={status} isLoading={isLoading}>
      <MsgShowWrapper
        message={message}
      />
    </ErrorOrPending>
  )
}

export default MessageShow
