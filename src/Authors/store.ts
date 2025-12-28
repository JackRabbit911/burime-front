import { createEffect, createEvent, createStore, sample } from "effector";
import type { ApiResponse } from "../common/ajax/types";
import ajax from "../common/ajax";
import { globalReset } from "../common/store";
import type { MyAuthor, MyAuthorOut } from "./schema";
import { saveAuthorUri } from "../common/constants";
import { modalOpened } from "../reused/Modal/store";
import { successDialog } from "../reused/InModal/SuccessDialog";
import { loading } from "../reused/InModal/Loading";

export const authorSubmitted = createEvent<MyAuthorOut>()
export const authorSaved = createEvent()

const saveMyAuthorFx = createEffect((data: MyAuthorOut) => {
    const post = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
    )

    return ajax.postForm(saveAuthorUri, post)
})

export const getMyAuthorsFx = createEffect(() => (
    ajax.get<ApiResponse<MyAuthor[]>>('/my/authors')
))

export const $myAuthors = createStore<MyAuthor[]>([])
    .reset(globalReset)

sample({
    clock: getMyAuthorsFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result,
    target: $myAuthors,
})

sample({
    clock: authorSubmitted,
    target: saveMyAuthorFx,
})

sample({
    clock: authorSubmitted,
    fn: () => loading,
    target: modalOpened,
})

sample({
    clock: saveMyAuthorFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successDialog({link: 'authors'}),
    target: modalOpened,
})
