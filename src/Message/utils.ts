import { deleteDialog } from "common/utils/deleteDialog"
import { defaultMsg } from "./components/Templates/DefaultMsg"
import { deleteMessageUri, removeMessageUri } from "common/constants"

import type { Message } from "./types"
import type { Author } from "reused/Participants/schema"
import { inviteToBranch } from "./components/Templates/InviteToBranch"

export const getComponent = (message: Message) => {
    const key = message.data?.tpl ?? ''
    
    switch (key) {
        case 'inviteToBranch':
            return inviteToBranch({ message })
        default:
            return defaultMsg({ message })
    }
}

export const removeMsg = (id: string | undefined) => {
    const uri = [removeMessageUri, id].join('/')
    const text = 'Your sended message will be deleted from everyone!'
    const link = '/message/outbox'

    deleteDialog(uri, text, link)
}

export const deleteMsg = (id: string | undefined, recipient: number) => {
    const uri = [deleteMessageUri, id, recipient].join('/')
    const text = 'This message will be deleted'
    const link = '/message/inbox'

    deleteDialog(uri, text, link)
}

export const addNewRecipient = (recipients: Author[], author: Author) => [...recipients, author]

export const addGroupRecipients = (recipients: Author[], group: Author[]) => {
    const mergedMembers = [...recipients, ...group]
    return Array.from(new Map(mergedMembers.map(item => [item.id, item])).values());
}
