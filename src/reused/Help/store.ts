import { createEffect, createEvent, createStore, sample } from "effector";

import ajax from "common/ajax";
import { $status, globalReset } from "common/store";
import { helpInputSch, type Help } from "./schema";
import type { ApiResponse } from "common/ajax/types";

export const helpBtnClicked = createEvent<string>()

export const getHelpDataFx = createEffect(
    (key: string) => {
        const uri = '/my/help/' + key
        return ajax.get<ApiResponse<string>>(uri)
    }
)

export const $hepls = createStore<Help[]>([])
    .reset(globalReset)

sample({
    clock: helpBtnClicked,
    source: $hepls,
    filter: (helps, key) => !Boolean(helps.find((help) => help.key === key)),
    fn: (_, key) => key,
    target: getHelpDataFx,
})

sample({
    clock: getHelpDataFx.doneData,
    filter: (response) => {
        const valid = helpInputSch.safeParse(response?.data?.result)

        if (Boolean(valid.error)) {
            console.log(valid.error)
        }

        return Boolean(valid.error)
    },
    fn: () => 555,
    target: $status,
})

sample({
    clock: getHelpDataFx.doneData,
    source: $hepls,
    filter: (_, response) => !response?.data?.success,
    fn: () => 400,
    target: $status,
})

sample({
    clock: getHelpDataFx.done,
    source: $hepls,
    filter: (_, response) => Boolean(response?.result?.data?.success),
    fn: (helps, response) => [...helps, {
        key: response.params,
        body: response?.result?.data?.result
    }],
    target: $hepls,
})
