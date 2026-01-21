import Grid3Cols from "../../../reused/Wrapper/Grid3Cols";
import type { Message } from "../../types"
import MsgBody from "../MsgBody";
import Controls from "./Controls";
import MsgInfo from "./MsgInfo";

type Props = {
  message: Message;
}

const MsgShowIn = ({ message }: Props) => {
  message.data.appeal = message.to_alias

  return (
    <>
      <Grid3Cols>
        <MsgInfo message={message} />
        <MsgBody message={message} />
      </Grid3Cols>
      <Controls />
    </>
  )
}

export default MsgShowIn
