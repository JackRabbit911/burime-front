import { useEffect } from "react";

import MsgInfo from "./MsgInfo";
import MsgBody from "../MsgBody";
import Controls from "../Controls";
import Grid3Cols from "reused/Wrapper/Grid3Cols";
import { toAliasSetted } from "Message/store";

import type { Message } from "../../types"

type Props = {
  message: Message;
}

const MsgShowOut = ({ message }: Props) => {
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
