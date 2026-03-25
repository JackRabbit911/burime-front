import Branch from "Message/components/Templates/Branch"
import { defaultMsg } from "Message/components/Templates/DefaultMsg"
import BranchForm from "Message/components/Templates/Forms/BranchForm"
import DefaultForm from "Message/components/Templates/Forms/DefaultForm"
import { inviteToGroup } from "Message/components/Templates/InviteToGroup"
import { inviteToBranch } from "Message/components/Templates/IviteToBranch"

import type { MessageForm } from "Message/schema"
import type { Message } from "Message/types"

export const getComponent = (message: Message) => {
    switch (message.data?.tpl ?? '') {
        case 'branch':
            return Branch({ message })
        case 'inviteToBranch':
            return inviteToBranch({ message })
        case 'inviteToGroup':
            return inviteToGroup({ message })
        default:
            return defaultMsg({ message })
    }
}

export const getMsgForm = (message: MessageForm) => {
    const tpl = message.message.data?.tpl || ''

    switch (tpl) {
        case 'branch':
            return BranchForm({ message })
        default:
            return DefaultForm()
    }
}
