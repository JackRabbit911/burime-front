import { createEvent, createStore } from "effector";
import { globalReset } from "common/store";

export const viewSetted = createEvent<string>()

export const $authorView = createStore('form')
    .on(viewSetted, (_, store) => store)
    .reset(globalReset)
