import { Link, useParams } from "react-router"

import { t } from "common/i18n/utils"
import { deleteMsg } from "Message/utils";
import { coverResetted } from "common/store/cover";

import type { Message } from "Message/types";

type Props = {
  message: Message;
}

const Controls = ({ message }: Props) => {
  const { id } = useParams()

  const msgData = {
    to: message.from.toString(),
    alias: message.from_alias,
    from: message.to.toString(),
    subject: 'Re: ' + message.subject,
  }

  const path = '/message/form'
  const search = new URLSearchParams(msgData)
  const link = [path, search.toString()].join('?')
  
  return (
    <div className="flex justify-end gap-2 mt-1">
      <Link to={link}>
        <button
          className="btn btn-success"
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
