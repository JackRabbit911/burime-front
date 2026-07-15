import { createEffect, createStore } from "effector";
import ajax from "common/ajax";
import { getCsrfUri } from "common/constants";
import type { ApiResponse } from "common/ajax/types";

export const getCsrfFx = createEffect(
    () => ajax.get<ApiResponse<string>>(getCsrfUri)
)

export const $csrf = createStore<string>('')
    .on(getCsrfFx.doneData, (_, response) => response?.data?.result)
