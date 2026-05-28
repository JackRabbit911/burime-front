import { perPages } from "common/constants"
import { base64ToFile } from "Branch/utils/files"
import type { BootstrapStore } from "Branch/schema/input"
import type { AuthorsPayload, Member, OwnAuthor } from "reused/Participants/types"

export const getDefaults = (bootstrap: BootstrapStore, ownAuthors: OwnAuthor[]) => {
    const masterId = getMasterId(bootstrap.members, ownAuthors)
    const members = getMembers(bootstrap.members, ownAuthors, masterId)
    
    return {
        branch: bootstrap.branch,
        branch_genres: bootstrap.branch_genres,
        members: members,
        posts: bootstrap.posts,
        masterId: masterId,
        cover: base64ToFile(bootstrap.files.cover, 'cover'),
        bgImg: base64ToFile(bootstrap.files.bg_img, 'background'),
        authorsPayload: setAuthorsPayload(),
        draft: bootstrap.draft || null,
        mask: 3,
    }
}

function setAuthorsPayload(limit = perPages[0]): AuthorsPayload {
    return {
        filter: null,
        search: null,
        page: 1,
        limit: limit,
    }
}

function getMasterId(members: Member[], ownAuthors: OwnAuthor[]): number {
    const master = members.length > 0
        ? members.reduce((acc, val) => {
            if (acc.role < val.role) {
                acc = val
            }

            return acc
        })
        : null
    return !master ? ownAuthors[0].id : master.id
}

export const changeMaster = (members: Member[], ownAuthors: OwnAuthor[], masterId: number) => {
    const ownAuthorsIds: number[] = []
    let masterAlias = ''

    ownAuthors.forEach((ownAuthor) => {
        ownAuthorsIds.push(ownAuthor?.id || 0)

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

function getMembers(members: Member[], ownAuthors: OwnAuthor[], masterId: number) {
    return members.length === 0 ? changeMaster(members, ownAuthors, masterId) : members
}
