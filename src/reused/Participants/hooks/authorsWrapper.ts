import { useEffect } from "react"
import { useUnit } from "effector-react"
import { useFormContext } from "react-hook-form"

import { getAuthorsFx } from "../store/authors"
import { referenceRecived } from "../store/reference"
import { $authorsPayload } from "../store/athorsPayload"
import { addGroupMembers, addNewMember } from "../utils"
import { getGroupMembersFx } from "../store/groupMembers"

import type { Author } from "../schema"

export const useAuthorsWrapper = (referenceUri: string) => {
    const authorsPayload = useUnit($authorsPayload)
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
        referenceRecived(referenceUri)
    }, [])
    
    useEffect(() => {
        getAuthorsFx(authorsPayload)
    }, [authorsPayload])
    
    return [members, authorsPayload, onChoice]
}
