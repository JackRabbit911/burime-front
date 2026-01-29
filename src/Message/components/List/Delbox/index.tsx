import { useList, useUnit } from "effector-react"
import { $delbox, $msgCounts } from "../../../store"
import { t } from "../../../../common/i18n/utils"
import { Link } from "react-router"
import MsgLine from "./MsgLine"

const Delbox = () => {
  const delbox = useList($delbox, (message) => <MsgLine message={message} />)
  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)

  return (
    <div role="tablist" className="tabs tabs-lift w-full">
      <Link to='/message/list/inbox' role="tab" className="tab">
        {t('Inbox')} ({inboxCount})
      </Link>
      <Link to='/message/list/outbox' role="tab" className="tab">
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
