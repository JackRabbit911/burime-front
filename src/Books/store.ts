import { createEffect, createStore, sample } from "effector";
import ajax from "../common/ajax";
import type { ApiResponse } from "../common/ajax/types";

type Cover = {
    bg_img: string | null,
    cover: string | null,
    bg_color: string,
    text_color: string,
    text_size: number,
}

type MyBook = {
    id: number,
    title: string,
    cover: Cover | string,
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
    fn: (response) => {
        return response.data.result.map((book) => {
            book.cover = JSON.parse(book.cover as string)
            return book
        })
    },
    target: $myBooks,
})
