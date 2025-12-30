import { createEffect, createEvent, createStore, sample } from "effector"
import type { ApiResponse } from "../../../common/ajax/types"
import ajax from "../../../common/ajax"

type ReferenceBooks = {
    authorsFilters: string[];
    authorsPermissions: { [index: string]: number };
    authorsStatuses: { [index: string]: number };
}

export const referenceRecived = createEvent<string>()

const getReferenceFx = createEffect(
    (uri: string) => {
        console.log('lala')
        return ajax.get<ApiResponse<ReferenceBooks>>(uri)
    }
)

export const $referenceBooks = createStore<ReferenceBooks>({
    authorsFilters: [],
    authorsPermissions: {},
    authorsStatuses: {},
})

sample({
    clock: referenceRecived,
    target: getReferenceFx,
})

sample({
    clock: referenceRecived,
    source: getReferenceFx.doneData,
    filter: (response) => response?.data?.success,
    fn: (response) => response?.data?.result,
    target: $referenceBooks,
})
