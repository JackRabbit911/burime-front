import ajax from "common/ajax";
import { getCoverUri } from "common/constants";
import { globalReset } from "common/store";
import type { MyBook } from "common/types/cover";
import { createEffect, createEvent, createStore } from "effector";

export const coverResetted = createEvent()

export const getCoverFx = createEffect(
    (id: string) => ajax.get([getCoverUri, id].join('/'))
)

export const $cover = createStore<MyBook | null>(null)
    .on(getCoverFx.doneData, (_, response) => response.data.result)
    .reset(globalReset, coverResetted)
