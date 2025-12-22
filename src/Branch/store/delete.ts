import type { AxiosError, AxiosResponse } from "axios";
import { createEffect, createEvent, sample } from "effector";
import type { ApiResponse } from "../../common/ajax/types";
import { deleteDraftUri } from "../../common/constants";
import ajax from "../../common/ajax";

type AxiosApiResponse = AxiosResponse<ApiResponse<string>>;

export const draftDeleted = createEvent<number>()

const draftDeleteFx = createEffect<number, AxiosApiResponse, AxiosError>(
    (draftId: number) => {
        const uri = deleteDraftUri + '/' + draftId.toString()

        return ajax.delete<ApiResponse<string>>(uri)
    }
)

sample({
    clock: draftDeleted,
    target: draftDeleteFx,
})
