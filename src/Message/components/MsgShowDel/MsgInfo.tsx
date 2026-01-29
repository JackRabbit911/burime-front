import { host } from "../../../common/ajax";
import { t } from "../../../common/i18n/utils";
import type { Message } from "../../types";
// import RecipientCmp from "./RecipientCmp";

type Props = {
  message: Message;
}

const MsgInfo = ({ message }: Props) => {
  // const recipients = message.to as Recipient[]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="fieldset">{t('Status')}</h3>
        <span className="fieldset">{t('Outgoing')}</span>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="fieldset">{t('From')}</h3>
          {message.from_alias}
        </div>
        <div className="avatar aspect-square size-20">
          <img src={`${host}/avatar/author/${message.from}`} alt={message.from_alias} />
        </div>
      </div>
      
    </div>
  )
}

export default MsgInfo
