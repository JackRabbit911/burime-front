import * as z from "zod"
import { createEffect, createEvent, createStore } from "effector";
import ajax from "../ajax";
import type { ApiResponse } from "../ajax/types";

const uri = '/branch/create/gettranslate'

const translateSch = z.object({})
    .catchall(z.string().nullable())

type Translate = z.infer<typeof translateSch>

export const translateKeyAdded = createEvent<string>()

export const getTranslateFx = createEffect(
    (tr: Translate) => {
        const filter = Object.keys(
            Object.fromEntries(
                Object.entries(tr).filter(([_, value]) => !value)
            )
        )

        return filter.length > 0
        ? ajax.post<ApiResponse<Translate>>(uri, {
            'filter': filter,
        })
        : null
    }
)

export const $translate = createStore<Translate>({})
    .on(translateKeyAdded, (store, key) => {
        if (!(key in store)) {
            store[key] = null
        }

        return store;
    })
    .on(getTranslateFx.doneData, (store, response) => (
        Object.assign({}, store, response?.data?.result)
    ))
