import { Link, useParams } from "react-router"

import { t } from "common/i18n/utils"
import { deleteMsg } from "Message/utils";
import { coverResetted } from "common/store/cover";
import { replySetted } from "Message/store";
import type { Message } from "Message/types";
import type { MessageForm } from "Message/schema";

type Props = {
  message: Message;
}

const Controls = ({ message }: Props) => {
  const { id } = useParams()

  const replyMsg: MessageForm = {
    message: {
      from: message.to as number,
      subject: 'Re: ' + message.subject,
      data: {body: ''}
    },
    recipients: [{
      id: message.from,
      alias: message.from_alias
    }],
    important: false,
  }

  const onReply = () => {
    replySetted(replyMsg)
  }

  return (
    <div className="flex justify-end gap-2 mt-1">
      <Link to="/message/form">
        <button
          className="btn btn-success"
          onClick={onReply}
        >
          {t('Reply to sender')}
        </button>
      </Link>
      <Link to="/message/inbox">
        <button
          className="btn"
          onClick={() => { coverResetted }}
        >
          {t('Back to message list')}
        </button>
      </Link>
      <button
        className="btn btn-error"
        onClick={() => deleteMsg(id, message.to as number)}
      >
        {t('Delete')}
      </button>
    </div >
  )
}

export default Controls
