import { createEvent, createStore, sample } from "effector";

export const globalReset = createEvent()
export const statusReset = createEvent()
export const statusSetted = createEvent<number>()

export const $status = createStore(200)
    .reset(globalReset, statusReset)

export const darkModeChanged = createEvent<boolean>()

export const $darkMode = createStore(initDarkMode())
    .on(darkModeChanged, (_, darkMode) => darkMode)

function initDarkMode () {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', handleThemeChange);

    return mq.matches
}

function handleThemeChange(this: MediaQueryList, ev: MediaQueryListEvent) {
    darkModeChanged(ev.matches)
}

sample({
    clock: statusSetted,
    target: $status,
})
