import { createEffect, createStore } from "effector";
import ajax from "../common/ajax";
import { getMessageListUri } from "../common/constants";
import type { ApiResponse } from "../common/ajax/types";
import type { Inbox, MessageList, Outbox } from "./types";

export const getMessageListFx = createEffect(
    () => ajax.get<ApiResponse<MessageList>>(getMessageListUri)
)

export const $inbox = createStore<Inbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.inbox)

export const $outbox = createStore<Outbox[]>([])
    .on(getMessageListFx.doneData, (_, response) => response.data.result.outbox)
