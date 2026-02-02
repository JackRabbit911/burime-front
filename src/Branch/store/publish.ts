import type { AxiosError, AxiosResponse } from "axios";
import { createEffect, createEvent, createStore, sample } from "effector";

import ajax from "common/ajax";
import { modalOpened } from "reused/Modal/store";
import { loading } from "reused/InModal/Loading";
import { $status, globalReset } from "common/store";
import type { ApiResponse } from "common/ajax/types";
import type { FormData, DraftData } from "../schema/output";
import { successDialog } from "reused/InModal/SuccessDialog";
import { saveBranchUri, saveDraftUri } from "common/constants";

export type FinalResponse = {
    [x: string]: string | number;
}

export const published = createEvent<FormData>()
export const draftClicked = createEvent<DraftData>()

export const publishFx = createEffect
    <FormData, AxiosResponse<ApiResponse<FinalResponse>>, AxiosError>(
        (data: FormData) => (
            ajax.postForm(saveBranchUri, data)
        )
    )

export const draftFx = createEffect
    <DraftData, AxiosResponse<ApiResponse<FinalResponse>>, AxiosError>(
        (data: DraftData) => (
            ajax.postForm(saveDraftUri, data)
        )
    )

export const $finalResponse = createStore<FinalResponse | null>(null)
    .reset(draftClicked, published, globalReset)

sample({
    clock: published,
    target: publishFx,
})

sample({
    clock: draftClicked,
    target: draftFx,
})

sample({
    clock: publishFx.failData,
    fn: (error) => error.message,
    target: modalOpened,
})

sample({
    clock: [publishFx.doneData, draftFx.doneData],
    filter: (response) => !response?.data?.success,
    fn: (response) => {
        console.log(response?.data?.error)
        return 400
    },
    target: $status,
})

sample({
    clock: [published, draftClicked],
    fn: () => loading,
    target: modalOpened,
})

sample({
    clock: [publishFx.doneData, draftFx.doneData],
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successDialog({link: 'books'}),
    target: modalOpened,
})
