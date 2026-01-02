import { combine, createEffect, createEvent, createStore, sample } from "effector"
import type { AxiosError, AxiosResponse } from "axios"
import type { ApiResponse } from "../../../common/ajax/types"
import { getAuthorsUri } from "../../../common/constants"
import ajax from "../../../common/ajax"
import { $status, globalReset } from "../../../common/store"
import { authorsSch, type Authors } from "../schema"
import type { AuthorsPayload } from "../types"

export const authorsPageChanged = createEvent<number>()
export const authorsLimitChanged = createEvent<number>()

export const memberIdSetted = createEvent<number>()
export const memberIdResetted = createEvent()

export const getAuthorsFx = createEffect
<AuthorsPayload, AxiosResponse<ApiResponse<Authors>>, AxiosError>(
    (payload: AuthorsPayload) => ajax.get(
        getAuthorsUri, {
            params: payload,
        })
)

export const $authors1 = createStore<Authors | null>(null)
    .reset(globalReset)

export const $total1 = combine($authors1, (authors) => authors?.count || 0)

export const $memberId1 = createStore<number>(0)
    .on(memberIdSetted, (_, id) => id)
    .reset(memberIdResetted, globalReset)

sample({
    clock: getAuthorsFx.doneData,
    filter: (response) => !response?.data?.success,
    fn: (response) => {
        console.log(response?.data?.error)
        return 400
    },
    target: $status,
})

sample({
    clock: getAuthorsFx.doneData,
    filter: (response) => {
        if (!response?.data?.success) {
            return false
        }

        const valid = authorsSch.safeParse(response?.data?.result)

        if (valid?.error) {
            console.log(valid.error)
        }
    
        return !valid.success
    },
    fn: () => 555,
    target: $status,
})

sample({
    clock: getAuthorsFx.doneData,
    filter: (response) => response?.data?.success,
    fn: (response) => response?.data?.result,
    target: $authors1,
})

