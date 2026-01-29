import { combine, createEffect, createEvent, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";
import type { Message, Inbox, MessageList, Outbox } from "./types";
import { getMessageListUri, getMessageUri, saveMessageUri } from "../common/constants";
import type { MessageOut } from "./schema";
import { successDialog } from "../reused/InModal/SuccessDialog";
import { modalOpened } from "../reused/Modal/store";
import { globalReset } from "../common/store";

export const msgResetted = createEvent()
export const toAliasSetted = createEvent<string>('')
export const msgSubmitted = createEvent<MessageOut>()

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

export const $message = createStore<Message | null>(null)
    .on(getMessageFx.doneData, (_, response) => response.data.result)
    .reset(msgResetted, globalReset)

export const $toAlias = createStore<string>('Author')

export const $msgCounts = combine({inbox: $inbox, outbox: $outbox}, (store) => ({
    inboxCount: store.inbox.length,
    outboxCount: store.outbox.length,
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
        link: 'message/list',
    }),
    target: modalOpened,
})
