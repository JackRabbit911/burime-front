import type { Author } from "./schema"
import type { Member } from "./types"

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

const newMember = (author: Author) => ({
    id: author.id,
        role: 1,
        status: 110,
        alias: author.alias,
})

export const addNewMember = (members: Member[], author: Author) => [...members, newMember(author)]

export const addGroupMembers = (members: Member[], group: Author[]) => {
    const groupMembers = group.map((author) => newMember(author))
    const mergedMembers = [...members, ...groupMembers]
    return Array.from(new Map(mergedMembers.map(item => [item.id, item])).values());
}

export const isPermission = (role: number, permission: number) => (role & permission) !== 0 ? true : false

export const changeMaster = (members: Member[], ownAuthors: Author[], masterId: number) => {
    const ownAuthorsIds: number[] = []
    let masterAlias = ''

    ownAuthors.forEach((ownAuthor) => {
        ownAuthorsIds.push(ownAuthor?.id)

        if (ownAuthor.id === Number(masterId)) {
            masterAlias = ownAuthor.alias
        }
    })

    const result = members.map((member) => {
        if (ownAuthorsIds.includes(member.id)) {
            member.id = Number(masterId)
            member.alias = masterAlias
        }

        return member
    })

    if (members.length === 0) {
        result.push({
            id: masterId,
            role: 255,
            status: 200,
            alias: masterAlias,
        })
    }

    return result;
}
