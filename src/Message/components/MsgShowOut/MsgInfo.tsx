import { host } from "common/ajax";
import RecipientCmp from "./RecipientCmp";
import type { Message, Recipient } from "Message/types";
import type { GetText } from "common/i18n/types";

type Props = {
  message: Message;
  __: GetText;
}

const MsgInfo = ({ __, message }: Props) => {
  const recipients = message.to as Recipient[]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="fieldset">{__('Status')}</h3>
        <span className="fieldset">{__('Outgoing')}</span>
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
      <h3 className="fieldset">{__('Recipients')}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {recipients.map((recipient) => (
              <RecipientCmp
                key={recipient.id}
                recipient={recipient}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MsgInfo
