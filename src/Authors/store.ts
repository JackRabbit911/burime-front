import { createEffect, createStore, sample } from "effector";
import type { ApiResponse } from "../common/ajax/types";
import ajax from "../common/ajax";
import { globalReset } from "../common/store";
import type { MyAuthor } from "./schema";

// export type Info = {
//     slogan: string;
//     info: string;
// }

// export type MyAuthor = {
//     id: number;
//     alias: string;
//     slogan: string;
//     info: string;
//     openclosed: number;
//     owner: boolean;
//     avatar: string;
// }

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
