import { useEffect } from "react";
import type { Message } from "../../types"
import MsgBody from "../MsgBody";
import MsgInfo from "./MsgInfo";
import { useUnit } from "effector-react";
import { $toAlias, toAliasSetted } from "../../store";
import Grid3Cols from "../../../reused/Wrapper/Grid3Cols";
import Controls from "../Controls";

type Props = {
  message: Message;
}

const MsgShowOut = ({ message }: Props) => {
  message.data.appeal = useUnit($toAlias)

  useEffect(() => {
    if (typeof (message.to) === 'object') {
      toAliasSetted(message.to[0].alias)
    }
  }, [])

  return (
    <>
      <Grid3Cols >
        <MsgInfo message={message} />
        <MsgBody message={message} />
      </Grid3Cols>
      <Controls link="/message/outbox" label="Delete from everyone" />
    </>
  )
}

export default MsgShowOut
