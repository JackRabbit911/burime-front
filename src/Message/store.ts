import { combine, createEffect, createEvent, createStore, sample } from "effector";
import { pending } from "patronum";

import ajax from "common/ajax";
import { globalReset } from "common/store";
import type { MessageForm, MessageOut } from "./schema";
import { modalOpened } from "reused/Modal/store";
import type { ApiResponse } from "common/ajax/types";
import { successDialog } from "reused/InModal/SuccessDialog";
import { getMessageListUri, getMessageUri, saveMessageUri } from "common/constants";

import type { Message, Inbox, MessageList, Outbox, Delbox } from "./types";

export const msgResetted = createEvent()
export const msgFormResetted = createEvent()
export const toAliasSetted = createEvent<string>('')
export const msgSubmitted = createEvent<MessageOut>()
export const replySetted = createEvent<MessageForm>()

export const getMessageListFx = createEffect(
    () => ajax.get<ApiResponse<MessageList>>(getMessageListUri)
)

export const getMessageFx = createEffect(
    (id: string) => ajax.get([getMessageUri, id].join('/'))
)

const saveMessageFx = createEffect((data: MessageOut) => (
    ajax.postForm(saveMessageUri, data)
))

export const $inbox = createStore<Inbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.inbox)
    .reset(globalReset)

export const $outbox = createStore<Outbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.outbox)
    .reset(globalReset)

export const $delbox = createStore<Delbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.deleted)
    .reset(globalReset)

export const $message = createStore<Message | null>(null)
    .on(getMessageFx.doneData, (_, response) => response.data.result)
    .reset(msgResetted, globalReset)

export const $msgForm = createStore<MessageForm>({
     message: {
      from: null,
      subject: '',
      data: {body: ''}
    },
    recipients: [],
    important: false,
})
    .on(replySetted, (_, data) => data)
    .reset(msgResetted, globalReset, msgFormResetted)

export const $toAlias = createStore<string>('Author')

export const $msgCounts = combine({inbox: $inbox, outbox: $outbox, delbox: $delbox}, (store) => ({
    inboxCount: store.inbox.length,
    outboxCount: store.outbox.length,
    delboxCount: store.delbox.length,
}))

sample({
    clock: toAliasSetted,
    fn: (alias) => alias,
    target: $toAlias
})

sample({
    clock: msgSubmitted,
    target: saveMessageFx,
})

sample({
    clock: saveMessageFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successDialog({
        text: 'Message was sended and saved!',
        link: 'message/outbox',
    }),
    target: modalOpened,
})

export const $isPending = pending([saveMessageFx])
