import { useParams } from "react-router"
import { useEffect } from "react"
import { $message, getMessageFx } from "../store"
import { useUnit } from "effector-react"
import MsgShowIn from "./MsgShowIn"
import MsgShowOut from "./MsgShowOut"

const MessageShow = () => {
  const { id } = useParams()
  const message = useUnit($message)

  useEffect(() => {
    getMessageFx(id as string)
  }, [])

  return (
    <>
      {message ? (
        <>
            {message.incoming ?
              <MsgShowIn message={message} /> :
              <MsgShowOut message={message} />}
        </>
      ) : null
      }
    </>
  )
}

export default MessageShow
