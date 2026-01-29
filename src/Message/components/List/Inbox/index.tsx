import { useList, useUnit } from "effector-react"
import { $inbox, $msgCounts } from "../../../store"
import MsgLine from "./MsgLine"
import { t } from "../../../../common/i18n/utils"
import TableHead from "../TableHead"
import { Link } from "react-router"

const Inbox = () => {
  const inbox = useList($inbox, (message) => <MsgLine message={message} />)
  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)

  return (
    <div role="tablist" className="tabs tabs-lift w-full">
      <a
        role="tab"
        className="tab tab-active"
      >
        {t('Inbox')} ({inboxCount})
      </a>
      <div role="tabpanel" className="w-full tab-content border-base-300 rounded-btn p-6">
        <table className="table">
          <TableHead />
          <tbody>
            {inbox}
          </tbody>
        </table>
      </div>
      <Link to='/message/list/outbox' role="tab" className="tab">
          {t('Outbox')} ({outboxCount})
      </Link>
      <Link to='/message/list/deleted' role="tab" className="tab">
          {t('Deleted')} ({delboxCount})
      </Link>
    </div >
  )
}

export default Inbox
