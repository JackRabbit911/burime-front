import { useEffect } from "react"
import { useParams } from "react-router"
import { useUnit } from "effector-react"

import { $message, getMessageFx } from "../store"
import MsgShowWrapper from "./WsgShowWrappper"
import { $status } from "common/store"
import ErrorCmp from "reused/ErrorCmp"

const MessageShow = () => {
  const { id } = useParams()
  const message = useUnit($message)
  const status = useUnit($status)

  useEffect(() => {
    getMessageFx(id as string)
  }, [])

  if (status >= 400) {
    return (
        <ErrorCmp status={status} />
    )
  }

  return (
    <>
      {message ? (
        <MsgShowWrapper
          message={message}
        />
      ) : null
      }
    </>
  )
}

export default MessageShow
