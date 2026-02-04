import ajax from "common/ajax";
import type { ApiResponse } from "common/ajax/types";
import { getGroupStatusUri, setGroupStatusUri } from "common/constants";
import { createEffect } from "effector";

type SetStatusPayload = {
    parent_id: number | string;
    child_id: number | string;
    status: number;
}

type StatusData = {
    status: number;
}

type GetStatusPayload = {
    group: number | string;
    author: number | string;
}

export const setGroupStatusFx = createEffect(
    (data: SetStatusPayload) => ajax.postForm(setGroupStatusUri, data)
)

export const getGroupStatusFx = createEffect(({ group, author }: GetStatusPayload) => {
    const uri = [getGroupStatusUri, group].join('/')
    const params = {author: author}
    return ajax.get<ApiResponse<StatusData>>(uri, { params: params })
})
