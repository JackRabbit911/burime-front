import { Link } from "react-router"
import { useList, useUnit } from "effector-react"

import MsgLine from "./MsgLine"
import { t } from "common/i18n/utils"
import { $delbox, $msgCounts } from "Message/store"

const Delbox = () => {
  const delbox = useList($delbox, (message) => <MsgLine message={message} />)
  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)

  return (
    <div role="tablist" className="tabs tabs-lift w-full">
      <Link to='/message/inbox' role="tab" className="tab">
        {t('Inbox')} ({inboxCount})
      </Link>
      <Link to='/message/outbox' role="tab" className="tab">
        {t('Outbox')} ({outboxCount})
      </Link>
      <a
        role="tab"
        className="tab tab-active"
      >
        {t('Deleted')} ({delboxCount})
      </a>
      <div role="tabpanel" className="w-full tab-content border-base-300 rounded-btn p-6">
        <table className="table">
          <thead>
            <tr>
              <th>{t('Subject')}</th>
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
