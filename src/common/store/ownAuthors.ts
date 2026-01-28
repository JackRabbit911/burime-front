import { createEffect, createStore } from "effector";
import ajax from "../ajax";
import { getOwnAuthorsUri } from "../constants";
import type { ApiResponse } from "../ajax/types";
import type { OwnAuthor } from "../../reused/Participants/types";

export const getOwnAuthorsFx = createEffect(
    () => ajax.get<ApiResponse<OwnAuthor[]>>(getOwnAuthorsUri)
)

export const $ownAuthors = createStore<OwnAuthor[]>([])
    .on(getOwnAuthorsFx.doneData, (_, response) => response.data.result)
