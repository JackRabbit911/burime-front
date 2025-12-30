import { perPages } from "../../common/constants"
import type { Author, AuthorsPayload } from "./schema"
import type { Member, OwnAuthor } from "./types"

export const getSimpleMembers = (members: Member[], ownAuthors: OwnAuthor[]) => {
    const ids = ownAuthors.map((val) => val.id)
    return members.filter((val) => (!ids.includes(val.id)))
}

export function setAuthorsPayload(limit = perPages[0]): AuthorsPayload {
    return {
        filter: null,
        search: null,
        page: 1,
        limit: limit,
    }
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
