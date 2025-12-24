import { createEffect, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";

type MyDraft = {
    id: number;
    title: string;
}

export const getMyDraftsFx = createEffect(() => (
    ajax.get<ApiResponse<MyDraft[]>>('/my/drafts')
))

export const $myDrafts = createStore<MyDraft[]>([])

sample({
    clock: getMyDraftsFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result,
    target: $myDrafts,
})
