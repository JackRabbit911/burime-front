import { createEffect, createEvent, createStore, sample } from "effector"

import ajax from "common/ajax"
import type { ApiResponse } from "common/ajax/types"

export type ReferenceBooks = {
    authorsFilters: string[];
    authorsPermissions?: { [index: string]: number };
    authorsStatuses?: { [index: string]: number };
}

export const referenceRecived = createEvent<string>()

const getReferenceFx = createEffect(
    (uri: string) => {
        return ajax.get<ApiResponse<ReferenceBooks>>(uri)
    }
)

export const $referenceBooks = createStore<ReferenceBooks | null>(null)

export const $permissions = $referenceBooks.map((store) => store?.authorsPermissions || {})
export const $statusObj = $referenceBooks.map((store) => store?.authorsStatuses || {})

sample({
    clock: referenceRecived,
    source: $referenceBooks,
    filter: (store) => store === null,
    fn: (_, uri) => uri,
    target: getReferenceFx,
})

sample({
    clock: getReferenceFx.doneData,
    filter: (response) => response?.data?.success,
    fn: (response) => response?.data?.result,
    target: $referenceBooks,
})
