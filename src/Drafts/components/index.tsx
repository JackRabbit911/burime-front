import { useList } from "effector-react"
import { $myDrafts, getMyDraftsFx } from "../store"
import { useEffect } from "react"
import { Link } from "react-router"

const Drafts = () => {
  const myDrafts = useList($myDrafts, {
    fn: (draft) => (
      <Link to={`/branch/${draft.id}/draft`}>
        <li>{draft.title}</li>
      </Link>
    ),
    placeholder: <h2>Здесь пока ничего нет</h2>
  })

  useEffect(() => {
    getMyDraftsFx()
  }, [])

  return (
      <ul className="link">
        {myDrafts}
      </ul>
  )
}

export default Drafts
