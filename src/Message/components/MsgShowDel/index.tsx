import Grid3Cols from "../../../reused/Wrapper/Grid3Cols";
import type { Message } from "../../types"
import Controls from "../Controls";
import MsgBody from "../MsgBody";
import MsgInfo from "./MsgInfo";

type Props = {
  message: Message;
}

const MsgShowDel = ({ message }: Props) => {
  message.data.appeal = message?.to_alias

  return (
    <>
      <Grid3Cols>
        <MsgInfo message={message} />
        <MsgBody message={message} />
      </Grid3Cols>
      <Controls link="/message/deleted" label="Delete" />
    </>
  )
}

export default MsgShowDel
