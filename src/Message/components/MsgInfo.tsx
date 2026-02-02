import { host } from "common/ajax";
import { t } from "common/i18n/utils";
import MsgStatus from "./MsgStatus";
import type { Message } from "../types";

type Props = {
  message: Message;
}

const MsgInfo = ({ message }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="fieldset">{t('Status')}</h3>
        <MsgStatus status={message.status} />
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
      <div className="flex justify-between">
        <div>
          <h3 className="fieldset">{t('Recipient')}</h3>
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
