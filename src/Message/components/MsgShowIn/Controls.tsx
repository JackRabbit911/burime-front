import { Link, useParams } from "react-router"

import { deleteMsg } from "Message/utils";
import { coverResetted } from "common/store/cover";

import type { Message } from "Message/types";
import type { GetText } from "common/i18n/types";

type Props = {
  message: Message;
  __: GetText;
}

const Controls = ({ __, message }: Props) => {
  const { id } = useParams()

  const msgData = {
    id: String(id),
    from: message.to.toString(),
    content: 'reply'
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
          {__('Reply to sender')}
        </button>
      </Link>
      <Link to="/message/inbox">
        <button
          className="btn"
          onClick={() => { coverResetted }}
        >
          {__('Back to message list')}
        </button>
      </Link>
      <button
        className="btn btn-error"
        onClick={() => deleteMsg(id, message.to as number)}
      >
        {__('Delete')}
      </button>
    </div >
  )
}

export default Controls
