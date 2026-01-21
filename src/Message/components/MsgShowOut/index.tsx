import { useEffect } from "react";
import type { Message } from "../../types"
import MsgBody from "../MsgBody";
import MsgInfo from "./MsgInfo";
import { useUnit } from "effector-react";
import { $toAlias, toAliasSetted } from "../../store";
import Controls from "./Controls";
import Grid3Cols from "../../../reused/Wrapper/Grid3Cols";

type Props = {
  message: Message;
}

const MsgShowOut = ({ message }: Props) => {
  message.data.appeal = useUnit($toAlias)

  useEffect(() => {
    if (typeof (message.to) === 'object') {
      message.to_alias = message.to[0].alias
      toAliasSetted(message.to_alias)
    }
  }, [])

  return (
    <>
      <Grid3Cols >
        <MsgInfo message={message} />
        <MsgBody message={message} />
      </Grid3Cols>
      <Controls />
    </>
  )
}

export default MsgShowOut
