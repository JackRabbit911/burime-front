import { Link } from "react-router"
import { useList, useUnit } from "effector-react"

import MsgLine from "./MsgLine"
import TableHead from "../TableHead"
import { $msgCounts, $outbox } from "Message/store"
import type { GetTextProp } from "common/i18n/types"

const Outbox = ({ __ }: GetTextProp) => {
  const outbox = useList($outbox, (message) => <MsgLine message={message} />)
  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)

  return (
    <div role="tablist" className="tabs tabs-lift w-full">
      <Link to='/message/inbox' role="tab" className="tab">
          {__('Inbox')} ({inboxCount})
      </Link>
      <a
        role="tab"
        className="tab tab-active"
      >
        {__('Outbox')} ({outboxCount})
      </a>
      <div role="tabpanel" className="w-full tab-content border-base-300 rounded-btn p-6">
        <table className="table">
          <TableHead __={__} />
          <tbody>
            {outbox}
          </tbody>
        </table>
      </div>
      <Link to='/message/deleted' role="tab" className="tab">
          {__('Deleted')} ({delboxCount})
      </Link>
    </div >
  )
}

export default Outbox
