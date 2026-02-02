import { useEffect } from "react"
import { useParams } from "react-router"
import { useUnit } from "effector-react"

import { $message, getMessageFx } from "../store"
import MsgShowWrapper from "./WsgShowWrappper"

type Props = {
  cond: string;
}

const MessageShow = ({ cond }: Props) => {
  const { id } = useParams()
  const message = useUnit($message)

  useEffect(() => {
    getMessageFx(id as string)
  }, [])

  return (
    <>
      {message ? (
        <MsgShowWrapper
          cond={cond}
          message={message}
        />
      ) : null
      }
    </>
  )
}

export default MessageShow
