import { useEffect } from "react";

import MsgInfo from "./MsgInfo";
import MsgBody from "../MsgBody";
import Controls from "../Controls";
import Grid3Cols from "reused/Wrapper/Grid3Cols";
import { toAliasSetted } from "Message/store";

import type { Message } from "../../types"
import { useTranslate } from "common/i18n/hooks";

type Props = {
  message: Message;
}

const MsgShowOut = ({ message }: Props) => {
  const __ = useTranslate()

  useEffect(() => {
    if (typeof (message.to) === 'object') {
      toAliasSetted(message.to[0].alias)
    }
  }, [])

  return (
    <>
      <Grid3Cols >
        <MsgInfo __={__} message={message} />
        <MsgBody __={__} message={message} />
      </Grid3Cols>
      <Controls __={__} link="/message/outbox" label="Delete from everyone" />
    </>
  )
}

export default MsgShowOut
