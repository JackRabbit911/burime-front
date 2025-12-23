import { combine, createEffect, createEvent, createStore, sample } from "effector";
import ajax from "../../common/ajax";
import type { ApiResponse } from "../../common/ajax/types";
import { bootstrapSch, type Bootstrap } from "../schema/input";
import { getBootsrapUri } from "../../common/constants";
import type { AxiosError, AxiosResponse } from "axios";
import { $status, globalReset } from "../../common/store";

type AxiosApiResponse = AxiosResponse<ApiResponse<Bootstrap>>;
type Segment = string | undefined;

export const appBranchStarted = createEvent()

export const getBootstrapFx = createEffect<Segment[], AxiosApiResponse, AxiosError>(
    ([id, draft]) =>
        ajax.get<ApiResponse<Bootstrap>>(
            [getBootsrapUri, id, draft].filter(Boolean).join('/'),
        ),
);

export const $bootstrap = createStore<Bootstrap | null>(null)
    .reset(globalReset)

export const $permissions = combine($bootstrap, (store) => store?.authorsPermissions || {})
export const $statusObj = combine($bootstrap, (store) => store?.authorsStatuses || {})

sample({
    clock: getBootstrapFx.doneData,
    filter: (response) => {
        const valid = bootstrapSch.safeParse(response?.data?.result)

        if (Boolean(valid.error)) {
            console.log(valid.error)
        }

        return Boolean(valid.error)
    },
    fn: () => 555,
    target: $status,
})

sample({
    clock: getBootstrapFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result,
    target: $bootstrap,
});

sample({
    clock: getBootstrapFx.doneData,
    filter: (response) => !response?.data?.success,
    fn: () => 400,
    target: $status,
});

sample({
    clock: getBootstrapFx.failData,
    fn: (error) => {
        return error?.status || 503
    },
    target: $status,
});
