import { createEvent, createStore } from "effector";
import type { AuthorsPayload } from "../types";
import { perPages } from "../../../common/constants";

export const limitSet = createEvent<number>()
export const pageSet = createEvent<number>()
export const searchSet = createEvent<string | null>()
export const filterSet = createEvent<string | null>()
export const authorsPayloadReset = createEvent()

export const $authorsPayload = createStore<AuthorsPayload>({
    page: 1, limit: perPages[0], search: null, filter: null,
}).on(pageSet, (store, page) => {
    const updatedStore = { ...store }
    updatedStore.page = page
    return updatedStore
}).on(limitSet, (store, limit) => {
    const updatedStore = { ...store }
    updatedStore.limit = limit
    return updatedStore
}).on(filterSet, (store, filter) => {
    const updatedStore = { ...store }
    updatedStore.filter = filter
    return updatedStore
}).on(searchSet, (store, search) => {
    const updatedStore = { ...store }
    updatedStore.search = search
    return updatedStore
}).on(authorsPayloadReset, (store) => {
    const updatedStore = { ...store }
    updatedStore.page = 1
    updatedStore.search = null
    updatedStore.filter = null
    return updatedStore
})
