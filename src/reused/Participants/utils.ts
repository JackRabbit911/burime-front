import type { Author } from "./schema"
import type { Member} from "./types"

export const getCurrentMember = (members: Member[], id: number): Member | null => {
    if (members.length === 0) {
        return null
    }

    const currentMembersArray = members.filter(
        (author: Member) => author.id === id
    )

    return currentMembersArray.length > 0
        ? currentMembersArray[0]
        : null
}

export const isInvited = (
    array: Member[],
    id: number,
): boolean => (
    Boolean(
        array.find((elem: Member) => elem.id === id)
    )
)

export const addNewMember = (
    members: Member[],
    author: Author,
    role: number = 1,
    status: number = 110
) => {
    const newMember = {
        id: author.id,
        role: role,
        status: status,
        alias: author.alias,
    }

    return [...members, newMember]
}

export const isPermission = (role: number, permission: number) => (role & permission) !== 0 ? true : false
