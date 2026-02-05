import MsgInfo from "./MsgInfo";
import MsgBody from "../MsgBody";
import Controls from "./Controls";
import Grid3Cols from "reused/Wrapper/Grid3Cols";
import type { Message } from "Message/types"

type Props = {
  message: Message;
}

const MsgShowIn = ({ message }: Props) => {
  return (
    <>
      <Grid3Cols>
        <MsgInfo message={message} />
        <MsgBody message={message} />
      </Grid3Cols>
      <Controls
        message={message}
      />
    </>
  )
}

export default MsgShowIn
