import { createEffect, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";
import { getMyStatUri } from "../common/constants";

type MyStat = {
    books: {
        total: number;
        own: number;
    };
    drafts: number;
    authors: {
        total: number;
        own: number;
    };
    messages: {
        total: number;
        new: number;
    };
    complete: number;
}

export const getMyStatFx = createEffect(() => (
    ajax.get<ApiResponse<MyStat>>(getMyStatUri)
))

export const $myStat = createStore<MyStat | null>(null)

sample({
    clock: getMyStatFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result,
    target: $myStat,
})
