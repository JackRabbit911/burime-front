import type { AxiosError, AxiosResponse } from "axios";
import { createEffect } from "effector";
import type { ApiResponse } from "../../common/ajax/types";
import { deleteAuthorUri } from "../../common/constants";
import ajax from "../../common/ajax";

type AxiosApiResponse = AxiosResponse<ApiResponse<string>>;

export const authorDeleteFx = createEffect<string | undefined, AxiosApiResponse, AxiosError>(
    (authorId: string | undefined) => {
        const uri = [deleteAuthorUri, authorId].join('/')

        return ajax.delete(uri)
    }
)
