import { useUnit } from "effector-react"
import AuthorsChoice from "../../../reused/Participants/components/AuthorsChoice"
import Members from "./Members"
import { $memberId1 } from "../../../reused/Participants/store/authors"
import MembersPermissions from "./MembersPermissions.tsx"
import { $referenceBooks, referenceRecived } from "../../../reused/Participants/store/reference.ts"
import { useEffect } from "react"
import { getGroupReferenceUri } from "../../../common/constants.ts"

const Participants = () => {
  const memberId = useUnit($memberId1)
  const referenceBooks = useUnit($referenceBooks)
  const authorsFilters = referenceBooks?.authorsFilters

  useEffect(() => {
    referenceRecived(getGroupReferenceUri)
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {memberId === 0 ?
        <>
          <fieldset className="fieldset">
            <Members />
          </fieldset>
          <div className="md:col-span-2">
            <AuthorsChoice
              filters={authorsFilters as string[]}
            />
          </div>
        </> :
        <MembersPermissions authorId={memberId} />}
    </div>
  )
}

export default Participants
