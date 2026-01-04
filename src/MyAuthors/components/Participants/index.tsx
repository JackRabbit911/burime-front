import { useEffect } from "react"
import { useUnit } from "effector-react"
import { useFormContext } from "react-hook-form"
import Members from "../../../reused/Participants/components/Members.tsx"
import MembersPermissions from "./MembersPermissions.tsx"
import { getGroupReferenceUri } from "../../../common/constants.ts"
import type { Author } from "../../../reused/Participants/schema.ts"
import { addNewMember } from "../../../reused/Participants/utils.ts"
import AuthorsChoice from "../../../reused/Participants/components/AuthorsChoice"
import { $authors1, $memberId1 } from "../../../reused/Participants/store/authors"
import { $referenceBooks, referenceRecived } from "../../../reused/Participants/store/reference.ts"
import { $authorsPayload } from "../../../reused/Participants/store/athorsPayload.ts"
import type { Member } from "../../../reused/Participants/types.ts"

const Participants = () => {
  const authors = useUnit($authors1)
  const memberId = useUnit($memberId1)
  const authorsPayload = useUnit($authorsPayload)
  const referenceBooks = useUnit($referenceBooks)
  const authorsFilters = referenceBooks?.authorsFilters

  const { getValues, setValue } = useFormContext()
  const members = getValues('members') || []

  const onChoice = (author: Author) => {
    const newMembers = addNewMember(members, author)
    setValue('members', newMembers, { shouldValidate: true, shouldDirty: true })
  }

  const onDelete = (member: Member) => {
    const newMembers = members.filter((item: Member) => item.id !== member.id)
    setValue('members', newMembers)
  }

  useEffect(() => {
    referenceRecived(getGroupReferenceUri)
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {memberId === 0 ?
        <>
          <fieldset className="fieldset">
              <Members
                members={members}
                onDelete={onDelete}
              />
          </fieldset>
          <div className="md:col-span-2">
            <AuthorsChoice
              filters={authorsFilters as string[]}
              authors={authors?.list}
              members={members}
              authorsPayload={authorsPayload}
              handler={onChoice}
            />
          </div>
        </> :
        <MembersPermissions authorId={memberId} />}
    </div>
  )
}

export default Participants
