import { createEffect, createEvent, sample } from "effector";
import { pending, throttle } from "patronum";

import ajax from "common/ajax";
import { modalOpened } from "reused/Modal/store";
import { successDialog } from "reused/InModal/SuccessDialog";
import { getUserDataUri, savePasswordUri, saveUserDataUri } from "common/constants";

import type { ApiResponse } from "common/ajax/types";
import type { ConfirmPassword, UserData } from "./schema";
import { successRedirectDialog } from "./components/SuccessRedirectDialog";

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
    ajax.postForm(saveUserDataUri, data)
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
    source: sendPasswordFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successDialog({
        text: 'Your password has been changed',
        link: 'profile',
    }),
    target: modalOpened,
})

export const $isPending = pending([sendProfileFx])
