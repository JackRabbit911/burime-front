import { combine, createEffect, createEvent, createStore, sample } from "effector";
import type { ApiResponse } from "../../common/ajax/types";
import ajax from "../../common/ajax";
import { globalReset } from "../../common/store";
import type { FormOutputType, MyAuthor } from "../schema";
import { saveAuthorUri } from "../../common/constants";
import { modalOpened } from "../../reused/Modal/store";
import { successDialog } from "../../reused/InModal/SuccessDialog";
import { loading } from "../../reused/InModal/Loading";
import type { Member } from "../../reused/Participants/types";

export const authorSubmitted = createEvent<FormOutputType>()
export const authorSaved = createEvent()

const saveMyAuthorFx = createEffect((data: FormOutputType) => {
    const post = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
    )

    return ajax.postForm(saveAuthorUri, post)
})

export const getMyAuthorsFx = createEffect(() => (
    ajax.get<ApiResponse<MyAuthor[]>>('/my/authors')
))

export const getMyMembersFx = createEffect((id: string | undefined) => (
    ajax.get<ApiResponse<Member[]>>(['/my/group/members', id].join('/'))
))

export const $myAuthors = createStore<MyAuthor[]>([])
    .reset(globalReset)

export const $myMembers = createStore<Member[]>([])
    .reset(globalReset)

export const $ownAuthors = combine($myAuthors, (store) => (
    store.filter((value) => value.owner === true && value.openclosed === 2)
        .map((value) => ({
            id: value.id,
            alias: value.alias,
        }))
))

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
    fn: () => successDialog({ link: 'authors' }),
    target: modalOpened,
})

sample({
    clock: getMyMembersFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result,
    target: $myMembers,
})
