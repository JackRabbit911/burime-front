import { deleteMessageUri, removeMessageUri } from "../common/constants"
import { deleteDialog } from "../common/utils/deleteDialog"
import type { Author } from "../reused/Participants/schema"
import { defaultMsg } from "./components/Templates/DefaultMsg"
import type { Message } from "./types"

export const getComponent = (message: Message) => {
    const key = message.data?.tpl ?? ''
    
    switch (key) {
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
