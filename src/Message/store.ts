import { createEffect, createStore } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";
import type { Message, Inbox, MessageList, Outbox } from "./types";
import { getMessageListUri, getMessageUri } from "../common/constants";

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
