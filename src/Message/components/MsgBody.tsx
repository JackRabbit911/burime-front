import { t } from "common/i18n/utils";
import { getComponent } from "../utils";
import type { Message } from "../types";

type Props = {
  message: Message;
}

const MsgBody = ({ message }: Props) => {
  return (
    <div className="md:col-span-2">
      <fieldset className="fieldset">
        {t('Subject')}
      </fieldset>
      <div className="border rounded-sm border-stone-500 p-1 my-3 text-md">
        {message.subject}
      </div>
      <fieldset className="fieldset">
        {t('Message')}
      </fieldset>
      <div className="border rounded-sm border-stone-500 p-1 my-3 text-sm">
        {getComponent(message)}
      </div>
    </div>
  )
}

export default MsgBody
