import { useParams } from "react-router"
import Grid3Cols from "../../reused/Wrapper/Grid3Cols"
import { useEffect } from "react"
import { $message, getMessageFx } from "../store"
import { useUnit } from "effector-react"
import MsgInfo from "./MsgInfo"
import type { Message } from "../types"
import MsgBody from "./MsgBody"

const MessageShow = () => {
  const { id } = useParams()
  const message = useUnit($message)

  useEffect(() => {
    getMessageFx(id as string)
  }, [])

  console.log(message)

  return (
    <>
      {message ? (
        <Grid3Cols >
          <MsgInfo message={message as Message} />
          <MsgBody message={message as Message} />
        </Grid3Cols >
      ) : null
      }
    </>
  )
}

export default MessageShow
