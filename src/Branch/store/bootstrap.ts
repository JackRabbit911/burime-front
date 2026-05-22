import { createEffect, createEvent, createStore, sample } from "effector";

import ajax from "common/ajax";
import { getBootsrapUri } from "common/constants";
import { $status, globalReset } from "common/store";
import { $ownAuthors } from "common/store/ownAuthors";

import type { ApiResponse } from "common/ajax/types";
import type { AxiosError, AxiosResponse } from "axios";
import { bootstrapSch, type Bootstrap, type BootstrapStore } from "Branch/schema/input";
import { $referenceBooks, type ReferenceBooks } from "reused/Participants/store/reference";

type AxiosApiResponse = AxiosResponse<ApiResponse<Bootstrap>>;
type Segment = string | undefined;

export const appBranchStarted = createEvent()

export const getBootstrapFx = createEffect<Segment[], AxiosApiResponse, AxiosError>(
    ([id, draft]) =>
        ajax.get<ApiResponse<Bootstrap>>(
            [getBootsrapUri, id, draft].filter(Boolean).join('/'),
        ),
);

export const $bootstrap = createStore<BootstrapStore | null>(null)
    .reset(globalReset)

export const $totalGenres  = $bootstrap.map((store) => store?.total_genres || [])

const allowedKeys = ['authorsFilters', 'authorsPermissions', 'authorsStatuses']

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
    fn: (response) => {
        const denyKeys = [...allowedKeys, 'ownAuthors']

        return Object.fromEntries(
            Object.entries(response.data.result).filter(([key]) => !denyKeys.includes(key))
        )  as Bootstrap
    },
    target: $bootstrap,
});

sample({
    clock: getBootstrapFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response) => response.data.result.ownAuthors,
    target: $ownAuthors,
});

sample({
    clock: getBootstrapFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: (response): ReferenceBooks => {
        return Object.fromEntries(
            Object.entries(response.data.result).filter(([key]) => allowedKeys.includes(key))
        )  as ReferenceBooks
    },
    target: $referenceBooks,
});

sample({
    clock: getBootstrapFx.doneData,
    filter: (response) => !response?.data?.success,
    fn: () => 400,
    target: $status,
});
