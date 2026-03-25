import { pending } from "patronum";
import { combine, createEffect, createEvent, createStore, sample } from "effector";

import ajax from "common/ajax";
import { emptyMessage } from "./utils";
import { globalReset } from "common/store";
import { modalOpened } from "reused/Modal/store";
import { successDialog } from "reused/InModal/SuccessDialog";
import { getMessageBlank, getMessageListUri, getMessageUri, saveMessageUri } from "common/constants";

import type { ApiResponse } from "common/ajax/types";
import type { MessageForm, MessageOut } from "./schema";
import type { Message, Inbox, MessageList, Outbox, Delbox } from "./types";
import type { AxiosError, AxiosResponse } from "axios";

type AxiosApiResponse = AxiosResponse<ApiResponse<Message>>;

export const msgResetted = createEvent()
export const msgFormResetted = createEvent()
export const toAliasSetted = createEvent<string>('')
export const msgSubmitted = createEvent<MessageOut>()
export const setMsgView = createEvent<string>()

export const getMessageListFx = createEffect(
    () => ajax.get<ApiResponse<MessageList>>(getMessageListUri)
)

export const getMessageFx = createEffect<string, AxiosApiResponse, AxiosError>(
    (id: string) => ajax.get([getMessageUri, id].join('/'))
)

export const getMessageBlankFx = createEffect(
    (search: string) => ajax.get(getMessageBlank + search)
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

export const $toAlias = createStore<string>('Author')

export const $messageBlank = createStore<MessageForm>(emptyMessage())
    .on(getMessageBlankFx.doneData, (_, response) => response.data.result)
    .reset(msgResetted, globalReset)

export const $viewMsgForm = createStore('choice')
    .on(setMsgView, (_, store) => store)
    .reset(msgResetted, globalReset)

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
export const $isPendingBlank = pending([getMessageBlankFx])
