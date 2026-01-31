import { createEffect, createEvent, sample } from "effector";
import ajax from "../common/ajax";
import { getUserDataUri, saveUserDataUri } from "../common/constants";
import type { UserData } from "./schema";
import type { ApiResponse } from "../common/ajax/types";
import { pending, throttle } from "patronum";
import { successDialog } from "../reused/InModal/SuccessDialog";
import { modalOpened } from "../reused/Modal/store";

export const profileSubmitted = createEvent<UserData>()

const throttled = throttle(profileSubmitted, 500)

export const getUserDataFx = createEffect(async () => {
    const response = await ajax.get<ApiResponse<UserData>>(getUserDataUri)
    const { result } = response.data
    return result
})

const sendProfileFx = createEffect((data: UserData) => (
    ajax.postForm(saveUserDataUri, data)
))

sample({
    clock: throttled,
    target: sendProfileFx,
})

sample({
    source: sendProfileFx.doneData,
    filter: (response) => Boolean(response?.data?.success),
    fn: () => successDialog({
        text: 'Your profile data was saved',
        link: '',
    }),
    target: modalOpened,
})

export const $isPending = pending([sendProfileFx])
