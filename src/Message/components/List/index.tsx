import { useEffect } from "react"
import { $inbox, $msgCounts, $outbox, getMessageListFx, msgResetted } from "../../store"
import { useList, useUnit } from "effector-react"
import { t } from "../../../common/i18n/utils"
import InMsgLine from "./InMsgLine"
import OutMsgLine from "./OutMsgLine"
import TableHead from "./TableHead"

const List = () => {
  const inbox = useList($inbox, (message) => <InMsgLine message={message} />)
  const outbox = useList($outbox, (message) => <OutMsgLine message={message} />)
  const { inboxCount, outboxCount } = useUnit($msgCounts)

  useEffect(() => {
    msgResetted()
    getMessageListFx()
  }, [])

  return (
    <>
      <h3 className="text-lg">{t('Inbox')} ({inboxCount})</h3>
      <table className="table">
        <TableHead />
        <tbody>
          {inbox}
        </tbody>
      </table>
      <h3 className="text-lg">{t('Outbox')} ({outboxCount})</h3>
      <table className="table">
        <TableHead />
        <tbody>
          {outbox}
        </tbody>
      </table>
    </>
  )
}

export default List
