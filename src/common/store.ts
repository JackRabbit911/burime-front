import { createEvent, createStore } from "effector";

export const globalReset = createEvent()

export const $status = createStore(200)
    .reset(globalReset)
