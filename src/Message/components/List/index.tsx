import { useEffect } from "react"
import { Link } from "react-router"

import Inbox from "./Inbox"
import Outbox from "./Outbox"
import Delbox from "./Delbox"
import { getMessageListFx, msgResetted } from "Message/store"
import { useTranslate } from "common/i18n/hooks"
import { statusReset } from "common/store"

type Props = {
  box: string;
}

const List = ({ box }: Props) => {
  const __ = useTranslate()

  let component

  switch (box) {
    case 'inbox':
      component = <Inbox __={__} />
      break
    case 'outbox':
      component = <Outbox __={__} />
      break
    case 'deleted':
      component = <Delbox __={__} />
      break
    default:
      component = `Invalid segment: ${box}`
  }

  useEffect(() => {
    statusReset()
    msgResetted()
    getMessageListFx()
  }, [])

  return (
    <>
      <div className="text-end">
        <Link to='/message/form'>
          <button className="link">
            {__('New message')}
          </button>
        </Link>
      </div>
      {component}
    </>
  )
}

export default List
