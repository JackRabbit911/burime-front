import { createEvent, createStore } from "effector";
import { globalReset } from "../../common/store";

export const stepChanged = createEvent<number>()

export const $step = createStore<number>(1)
    .on(stepChanged, (_, newStep) => newStep)
    .reset(globalReset)
