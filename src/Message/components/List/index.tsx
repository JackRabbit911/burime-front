import { useEffect, useState } from "react"
import { $delbox, $inbox, $msgCounts, $outbox, getMessageListFx, msgResetted } from "../../store"
import { useList, useUnit } from "effector-react"
import { t } from "../../../common/i18n/utils"
import InMsgLine from "./InMsgLine"
import OutMsgLine from "./OutMsgLine"
import TableHead from "./TableHead"
import { Link } from "react-router"
import DelMsgLine from "./DelMsgLine"

const List = () => {
  const inbox = useList($inbox, (message) => <InMsgLine message={message} />)
  const outbox = useList($outbox, (message) => <OutMsgLine message={message} />)
  const delbox = useList($delbox, (message) => <DelMsgLine message={message} />)

  const { inboxCount, outboxCount, delboxCount } = useUnit($msgCounts)
  const [tab, setTab] = useState('inbox')

  let inboxClass = "tab"
  let outboxClass = "tab"
  let delboxClass = "tab"

  switch (tab) {
    case ('inbox'):
      inboxClass = "tab tab-active"
      outboxClass = "tab"
      delboxClass = "tab"
      break
    case ('outbox'):
      inboxClass = "tab"
      outboxClass = "tab tab-active"
      delboxClass = "tab"
      break
    case ('deleted'):
      inboxClass = "tab"
      outboxClass = "tab"
      delboxClass = "tab tab-active"
      break
  }

  useEffect(() => {
    msgResetted()
    getMessageListFx()
  }, [])

  return (
    <>
      <div className="text-end">
        <Link to='/message/form'>
          <button className="link">
            New message
          </button>
        </Link>
      </div>
      <div role="tablist" className="tabs tabs-lift w-full">
        <a
          role="tab"
          className={inboxClass}
          onClick={() => setTab('inbox')}
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
        <a
          role="tab"
          className={outboxClass}
          onClick={() => setTab('outbox')}
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
        <a
          role="tab"
          className={delboxClass}
          onClick={() => setTab('deleted')}
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
      </div>
    </>
  )
}

export default List
