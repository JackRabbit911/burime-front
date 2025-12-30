import { useUnit } from "effector-react"
import AuthorsChoice from "../../../reused/Participants/components/AuthorsChoice"
import Members from "./Members"
import { $memberId1 } from "../../../reused/Participants/store/authors"
import MembersPermissions from "./MembersPermissions.tsx"

const Participants = () => {
  const memberId = useUnit($memberId1)

  const filters = [
    'friends',
    'favorites',
    'addressbook',
  ]

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {memberId === 0 ?
        <>
          <fieldset className="fieldset">
            <Members />
          </fieldset>
          <div className="md:col-span-2">
            <AuthorsChoice
              filters={filters}
            />
          </div>
        </> :
        <MembersPermissions authorId={memberId} />}
    </div>
  )
}

export default Participants
