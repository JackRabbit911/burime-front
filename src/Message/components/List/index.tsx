import { useEffect } from "react"
import { Link } from "react-router"

import Inbox from "./Inbox"
import Outbox from "./Outbox"
import Delbox from "./Delbox"
import { getMessageListFx, msgResetted } from "Message/store"
import { t } from "common/i18n/utils"
import { useTranslate } from "common/i18n/hook"

type Props = {
  box: string;
}

const List = ({ box }: Props) => {
  useTranslate()

  let component

  switch (box) {
    case 'inbox':
      component = <Inbox />
      break
    case 'outbox':
      component = <Outbox />
      break
    case 'deleted':
      component = <Delbox />
      break
    default:
      component = `Invalid segment: ${box}`
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
            {t('New message')}
          </button>
        </Link>
      </div>
      {component}
    </>
  )
}

export default List
