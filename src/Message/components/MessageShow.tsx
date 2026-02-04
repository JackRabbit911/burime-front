import { useEffect } from "react"
import { useParams } from "react-router"
import { useUnit } from "effector-react"

import { $message, getMessageFx } from "../store"
import MsgShowWrapper from "./WsgShowWrappper"

const MessageShow = () => {
  const { id } = useParams()
  const message = useUnit($message)

  useEffect(() => {
    getMessageFx(id as string)
  }, [])

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
