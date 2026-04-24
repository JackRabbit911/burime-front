import { useEffect } from "react"
import { Link } from "react-router"
import { useUnit } from "effector-react"

import Inbox from "./Inbox"
import Outbox from "./Outbox"
import Delbox from "./Delbox"
import { statusReset } from "common/store"
import { $ownAuthors } from "MyAuthors/store"
import { useTranslate } from "common/i18n/hooks"
import ErrorOrPending from "reused/ErrorOrPendig"
import { getOwnAuthorsFx } from "common/store/ownAuthors"
import { $isPending, getMessageListFx, msgResetted } from "Message/store"

import type { GetText } from "common/i18n/types"

const component = (box: string, __: GetText) => {
  switch (box) {
    case 'inbox':
      return <Inbox __={__} />
    case 'outbox':
      return <Outbox __={__} />
    case 'deleted':
      return <Delbox __={__} />
    default:
      return `Invalid segment: ${box}`
  }
}

type Props = {
  box: string;
}

const List = ({ box }: Props) => {
  const isLoading = useUnit($isPending)
  const ownAuthors = useUnit($ownAuthors)
  const __ = useTranslate()

  useEffect(() => {
    statusReset()
    msgResetted()
    getMessageListFx()

    if (ownAuthors.length === 0) {
      getOwnAuthorsFx()
    }
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
      <ErrorOrPending isLoading={isLoading}>
        {component(box, __)}
      </ErrorOrPending>
    </>
  )
}

export default List
