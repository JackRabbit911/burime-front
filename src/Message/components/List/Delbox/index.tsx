import { Link } from "react-router"
import { useList, useUnit } from "effector-react"

import MsgLine from "./MsgLine"
import { $delbox, $msgCounts } from "Message/store"
import type { GetTextProp } from "common/i18n/types"

const Delbox = ({ __ }: GetTextProp) => {
  const delbox = useList($delbox, (message) => <MsgLine message={message} />)
  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)

  return (
    <div role="tablist" className="tabs tabs-lift w-full">
      <Link to='/message/inbox' role="tab" className="tab">
        {__('Inbox')} ({inboxCount})
      </Link>
      <Link to='/message/outbox' role="tab" className="tab">
        {__('Outbox')} ({outboxCount})
      </Link>
      <a
        role="tab"
        className="tab tab-active"
      >
        {__('Deleted')} ({delboxCount})
      </a>
      <div role="tabpanel" className="w-full tab-content border-base-300 rounded-btn p-6">
        <table className="table">
          <thead>
            <tr>
              <th>{__('Subject')}</th>
            </tr>
          </thead>
          <tbody>
            {delbox}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Delbox
