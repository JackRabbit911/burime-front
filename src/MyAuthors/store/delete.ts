import { createEffect } from "effector";

import ajax from "common/ajax";
import { deleteAuthorUri } from "common/constants";
import type { ApiResponse } from "common/ajax/types";
import type { AxiosError, AxiosResponse } from "axios";

type AxiosApiResponse = AxiosResponse<ApiResponse<string>>;

export const authorDeleteFx = createEffect<string | undefined, AxiosApiResponse, AxiosError>(
    (authorId: string | undefined) => {
        const uri = [deleteAuthorUri, authorId].join('/')

        return ajax.delete(uri)
    }
)
