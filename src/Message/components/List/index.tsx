import { useEffect, useState } from "react"
import { $inbox, $msgCounts, $outbox, getMessageListFx, msgResetted } from "../../store"
import { useList, useUnit } from "effector-react"
import { t } from "../../../common/i18n/utils"
import InMsgLine from "./InMsgLine"
import OutMsgLine from "./OutMsgLine"
import TableHead from "./TableHead"
import { Link } from "react-router"

const List = () => {
  const inbox = useList($inbox, (message) => <InMsgLine message={message} />)
  const outbox = useList($outbox, (message) => <OutMsgLine message={message} />)
  const { inboxCount, outboxCount } = useUnit($msgCounts)
  const [tab, setTab] = useState('inbox')
  let inboxClass = "tab"
  let ouboxClass = "tab"

  switch (tab) {
    case ('inbox'):
      inboxClass = "tab tab-active"
      ouboxClass = "tab"
      break
    case ('outbox'):
      inboxClass = "tab"
      ouboxClass = "tab tab-active"
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
          className={ouboxClass}
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
      </div>
    </>
  )
}

export default List
