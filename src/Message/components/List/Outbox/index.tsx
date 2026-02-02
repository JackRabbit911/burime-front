import { Link } from "react-router"
import { useList, useUnit } from "effector-react"

import MsgLine from "./MsgLine"
import TableHead from "../TableHead"
import { t } from "common/i18n/utils"
import { $msgCounts, $outbox } from "Message/store"

const Outbox = () => {
  const outbox = useList($outbox, (message) => <MsgLine message={message} />)
  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)

  return (
    <div role="tablist" className="tabs tabs-lift w-full">
      <Link to='/message/inbox' role="tab" className="tab">
          {t('Inbox')} ({inboxCount})
      </Link>
      <a
        role="tab"
        className="tab tab-active"
      >
        {t('Outbox')} ({outboxCount})
      </a>
      <div role="tabpanel" className="w-full tab-content border-base-300 rounded-btn p-6">
        <table className="table">
          <TableHead />
          <tbody>
            {outbox}
          </tbody>
        </table>
      </div>
      <Link to='/message/deleted' role="tab" className="tab">
          {t('Deleted')} ({delboxCount})
      </Link>
    </div >
  )
}

export default Outbox
