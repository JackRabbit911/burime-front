import { getComponent } from "Message/utils/components";

import type { Message } from "../types";
import type { GetText } from "common/i18n/types";

type Props = {
  message: Message;
  __: GetText;
}

const MsgBody = ({ __, message }: Props) => {
  return (
    <div className="md:col-span-2">
      <fieldset className="fieldset">
        {__('Subject')}
      </fieldset>
      <div className="border rounded-sm border-zinc-600 p-1 my-3 text-sm">
        {message.subject}
      </div>
      <fieldset className="fieldset">
        {__('Message')}
      </fieldset>
      <div className="border rounded-sm border-zinc-600 p-1 my-3 text-sm">
        {getComponent(message)}
      </div>
    </div>
  )
}

export default MsgBody
