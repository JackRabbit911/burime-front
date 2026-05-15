import { useUnit } from "effector-react"
import { useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"

import { getMsgReferenceUri } from "common/constants"
import { addGroupRecipients, addNewRecipient } from "Message/utils"
import { referenceRecived } from "reused/Participants/store/reference"
import { $authorsPayload } from "reused/Participants/store/athorsPayload"
import { getGroupMembersFx } from "reused/Participants/store/groupMembers"

import type { Author } from "Branch/schema/authors"

export const useAuthorsChoice = () => {
    const authorsPayload = useUnit($authorsPayload)
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

    return [recipients, authorsPayload, onChoice]
}
