import type { Author } from "Branch/schema/authors"
import { getMsgReferenceUri } from "common/constants"
import { useUnit } from "effector-react"
import { addGroupRecipients, addNewRecipient } from "Message/utils"
import { useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { $authorsPayload } from "reused/Participants/store/athorsPayload"
import { $authorsList } from "reused/Participants/store/authors"
import { getGroupMembersFx } from "reused/Participants/store/groupMembers"
import { $referenceBooks, referenceRecived } from "reused/Participants/store/reference"

export const useAuthorsChoice = () => {
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

    const onChoiceGroup = useCallback(async (author: Author) => {
        const recipients = watch('recipients') || []
        const response = await getGroupMembersFx(author.id)
        const result = response.data.result
        const newRecipients = addGroupRecipients(recipients, result)
        setValue('recipients', newRecipients, { shouldValidate: true, shouldDirty: true })
    }, [])

    const onChoice = authorsPayload.filter === 'groups' ? onChoiceGroup : onChoiceAuthor


    useEffect(() => {
        referenceRecived(getMsgReferenceUri)
    }, [])

    return [authorsFilters, authorsList, recipients, authorsPayload, onChoice]
}
