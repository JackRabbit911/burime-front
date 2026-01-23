import { useEffect } from "react"
import { useUnit } from "effector-react"
import { useFormContext } from "react-hook-form"
import { $authorsList, $memberId } from "../store/authors"
import { $authorsPayload } from "../store/athorsPayload"
import { $referenceBooks, referenceRecived } from "../store/reference"
import { addGroupMembers, addNewMember } from "../utils"
import type { Author } from "../schema"
import { getGroupMembersFx } from "../store/groupMembers"
import type { OwnAuthor } from "../types"
import { getGroupReferenceUri } from "../../../common/constants"
import Select from "./Select"
import AuthorsChoice from "./AuthorsChoice"

type Props = {
  ownAuthors: OwnAuthor[];
  choiceList: React.ReactNode;
  permissions: React.ReactNode;
}

const AuthorsWrapper = ({ ownAuthors, choiceList, permissions }: Props) => {
  const authorsList = useUnit($authorsList)
  const memberId = useUnit($memberId)
  const authorsPayload = useUnit($authorsPayload)
  const referenceBooks = useUnit($referenceBooks)
  const authorsFilters = referenceBooks?.authorsFilters || []

  const { watch, setValue } = useFormContext()
  const members = watch('members') || []

  const onChoiceAuthor = (author: Author) => {
    const newMembers = addNewMember(members, author)
    setValue('members', newMembers, { shouldValidate: true, shouldDirty: true })
  }

  const onChoiceGroup = (author: Author) => {
    const promise = getGroupMembersFx(author.id)
    promise.then((response) => response.data.result)
      .then((result) => {
        const newMembers = addGroupMembers(members, result)
        setValue('members', newMembers, { shouldValidate: true, shouldDirty: true })
      })
  }

  const onChoice = authorsPayload.filter === 'groups' ? onChoiceGroup : onChoiceAuthor

  useEffect(() => {
    referenceRecived(getGroupReferenceUri)
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {memberId === 0 ?
        <>
          <div>
            {ownAuthors.length > 0 ?
              <Select
                fieldName="masterId"
                label="Team leader"
                options={ownAuthors}
              /> : null}
              {choiceList}
          </div>
          <div className="md:col-span-2">
            <AuthorsChoice
              filters={authorsFilters}
              authors={authorsList}
              members={members}
              authorsPayload={authorsPayload}
              handler={onChoice}
            />
          </div>
        </> : permissions
        }
    </div>
  )
}

export default AuthorsWrapper
