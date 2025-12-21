import { createEffect, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";

type MyBook = {
    id: number,
    title: string,
    cover: string,
    alias: string,
    genreStr: string,
}

export const getMyBooksFx = createEffect(() => (
    ajax.get<ApiResponse<MyBook[]>>('/my/books')
))

export const $myBooks = createStore<MyBook[]>([])

sample({
    clock: getMyBooksFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result,
    target: $myBooks,
})
