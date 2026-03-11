import MsgInfo from "./MsgInfo";
import MsgBody from "../MsgBody";
import Controls from "../Controls";
import Grid3Cols from "reused/Wrapper/Grid3Cols";
import type { Message } from "Message/types"
import { useTranslate } from "common/i18n/hooks";

type Props = {
  message: Message;
}

const MsgShowDel = ({ message }: Props) => {
  const __ = useTranslate()

  return (
    <>
      <Grid3Cols>
        <MsgInfo __={__} message={message} />
        <MsgBody __={__} message={message} />
      </Grid3Cols>
      <Controls __={__} link="/message/deleted" label="Delete" />
    </>
  )
}

export default MsgShowDel
