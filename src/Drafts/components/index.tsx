import { useEffect } from "react"
import { Link } from "react-router"
import { useList, useUnit } from "effector-react"

import { useTranslate } from "common/i18n/hooks"
import ErrorOrPending from "reused/ErrorOrPendig"
import { $isPending, $myDrafts, getMyDraftsFx } from "../store"

const Drafts = () => {
  const isLoading = useUnit($isPending)
  const __ = useTranslate()
  const myDrafts = useList($myDrafts, {
    fn: (draft) => (
      <Link to={`/branch/${draft.id}/draft`}>
        <li>{draft.title}</li>
      </Link>
    ),
    placeholder: __("There's nothing here yet")
  })

  useEffect(() => {
    getMyDraftsFx()
  }, [])

  return (
    <ErrorOrPending isLoading={isLoading}>
      <ul className="link">
        {myDrafts}
      </ul>
    </ErrorOrPending>
  )
}

export default Drafts
