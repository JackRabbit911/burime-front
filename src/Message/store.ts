import { combine, createEffect, createEvent, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";
import type { Message, Inbox, MessageList, Outbox } from "./types";
import { getMessageListUri, getMessageUri } from "../common/constants";

export const msgResetted = createEvent()
export const toAliasSetted = createEvent<string>('')

export const getMessageListFx = createEffect(
    () => ajax.get<ApiResponse<MessageList>>(getMessageListUri)
)

export const getMessageFx = createEffect(
    (id: string) => ajax.get([getMessageUri, id].join('/'))
)

export const $inbox = createStore<Inbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.inbox)

export const $outbox = createStore<Outbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.outbox)

export const $message = createStore<Message | null>(null)
    .on(getMessageFx.doneData, (_, response) => response.data.result)
    .reset(msgResetted)

export const $toAlias = createStore<string>('Author')

export const $msgCounts = combine({inbox: $inbox, outbox: $outbox}, (store) => ({
    inboxCount: store.inbox.length,
    outboxCount: store.outbox.length,
}))

sample({
    clock: toAliasSetted,
    source: $message,
    filter: (message) => typeof (message?.to) === 'object',
    fn: (message, alias) => {
        if (typeof (message?.to) === 'object') {
            return alias
        }

        return 'Author'
    },
    target: $toAlias
})
