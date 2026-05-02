import { pending, throttle } from "patronum";
import { createEffect, createEvent, sample } from "effector";

import ajax from "common/ajax";
import { modalOpened } from "reused/Modal/store";
import { serverErrorRecieved } from "common/store";
import { successDialog } from "reused/InModal/SuccessDialog";
import { successRedirectDialog } from "./components/SuccessRedirectDialog";
import { getUserDataUri, savePasswordUri, saveUserDataUri } from "common/constants";

import type { ConfirmPassword, UserData } from "./schema";
import type { ApiResponse, ValidationError } from "common/ajax/types";

export const profileSubmitted = createEvent<UserData>()
export const passwordSubmitted = createEvent<ConfirmPassword>()

const throttledProfileSubmitted = throttle(profileSubmitted, 500)
const throttledPasswordSubmitted = throttle(passwordSubmitted, 500)

export const getUserDataFx = createEffect(async () => {
    const response = await ajax.get<ApiResponse<UserData>>(getUserDataUri)
    const { result } = response.data
    return result
})

const sendProfileFx = createEffect((data: UserData) => (
    ajax.postForm<ApiResponse<boolean, ValidationError[]>>(saveUserDataUri, data)
))

const sendPasswordFx = createEffect((data: ConfirmPassword) => (
    ajax.postForm(savePasswordUri, data)
))

sample({
    clock: throttledProfileSubmitted,
    target: sendProfileFx,
})

sample({
    clock: throttledPasswordSubmitted,
    target: sendPasswordFx,
})

sample({
    source: sendProfileFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successRedirectDialog({}),
    target: modalOpened,
})

sample({
    source: sendProfileFx.doneData,
    filter: (response) => !response?.data?.success,
    fn: (response) => response?.data?.error,
    target: serverErrorRecieved,
})

sample({
    source: sendPasswordFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successDialog({
        text: 'Your password has been changed',
        link: 'profile',
    }),
    target: modalOpened,
})

sample({
    clock: sendProfileFx.failData,
    fn: (error) => error.message,
    target: modalOpened,
})

export const $isPending = pending([sendProfileFx, getUserDataFx])
