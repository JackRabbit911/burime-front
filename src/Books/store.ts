import { createEffect, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";
import type { MyBook } from "./types";
import { getMyBooksUri } from "../common/constants";

export const getMyBooksFx = createEffect(() => (
    ajax.get<ApiResponse<MyBook[]>>(getMyBooksUri)
))

export const $myBooks = createStore<MyBook[]>([])

sample({
    clock: getMyBooksFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => (
        response.data.result.map((book) => {
            book.cover = JSON.parse(book.cover as string)
            return book
        })
    ),
    target: $myBooks,
})
