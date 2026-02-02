import { useEffect } from "react"
import { useUnit } from "effector-react"
import { useFormContext } from "react-hook-form"

import { getMsgReferenceUri } from "common/constants"
import { $authorsList } from "reused/Participants/store/authors"
import { addGroupRecipients, addNewRecipient } from "../../utils"
import AuthorsChoice from "reused/Participants/components/AuthorsChoice"
import { $authorsPayload } from "reused/Participants/store/athorsPayload"
import { getGroupMembersFx } from "reused/Participants/store/groupMembers"
import { $referenceBooks, referenceRecived } from "reused/Participants/store/reference"

import type { Author } from "reused/Participants/schema"

const AuthorsChoiceWrapper = () => {
  const authorsList = useUnit($authorsList)
  const authorsPayload = useUnit($authorsPayload)
  const referenceBooks = useUnit($referenceBooks)
  const authorsFilters = referenceBooks?.authorsFilters || []

  const { watch, setValue } = useFormContext()
  const recipients = watch('recipients') || []

  const onChoiceAuthor = (author: Author) => {
    const newRecipients = addNewRecipient(recipients, author)
    setValue('recipients', newRecipients, { shouldValidate: true, shouldDirty: true })
  }

  const onChoiceGroup = async (author: Author) => {
    const response = await getGroupMembersFx(author.id)
    const result = response.data.result
    const newRecipients = addGroupRecipients(recipients, result)
    setValue('recipients', newRecipients, { shouldValidate: true, shouldDirty: true })
  }

  const onChoice = authorsPayload.filter === 'groups' ? onChoiceGroup : onChoiceAuthor

  useEffect(() => {
    referenceRecived(getMsgReferenceUri)
  }, [])

  return (
    <AuthorsChoice
      filters={authorsFilters}
      authors={authorsList}
      members={recipients}
      authorsPayload={authorsPayload}
      handler={onChoice}
    />
  )
}

export default AuthorsChoiceWrapper
