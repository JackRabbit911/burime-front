import { host } from "common/ajax";
import MsgStatus from "../MsgStatus";
import type { Message } from "Message/types";
import type { GetText } from "common/i18n/types";

type Props = {
  message: Message;
  __: GetText;
}

const MsgInfo = ({ __, message }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="fieldset">{__('Status')}</h3>
        <span className="fieldset">{__('incoming')}</span>
        <MsgStatus status={message.status} />
      </div>
      <div className="flex justify-between overflow-x-auto">
        <div>
          <h3 className="fieldset">{__('From')}</h3>
          {message.from_alias}
        </div>
        <div className="avatar aspect-square size-20">
          <img src={`${host}/avatar/author/${message.from}`} alt={message.from_alias} />
        </div>
      </div>
      <div className="flex justify-between overflow-x-auto">
        <div>
          <h3 className="fieldset">{__('Recipients')}</h3>
          {message.to_alias}
        </div>
        <div className="avatar aspect-square size-20">
          <img src={`${host}/avatar/author/${message.to}`} alt={message.to_alias} />
        </div>
      </div>
    </div>
  )
}

export default MsgInfo
