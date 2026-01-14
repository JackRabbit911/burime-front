import type { FieldErrors, FieldValues } from "react-hook-form"
import { host } from "../common/ajax"
import { fileToUrl, isObjectEmpty } from "../common/utils"
import type { Author } from "../reused/Participants/schema"

export const avatarSrc = (
    file: File | null | undefined,
    src: string | undefined): string => {
    return file ? fileToUrl(file) :
        (src ? `${host}/${src}` :
            `${host}/avatar/no_avatar.jpg`)
}

export const submitDisabled = (author: Author | undefined, errors: FieldErrors<FieldValues>) => (
    author === undefined || author?.alias == '' || !isObjectEmpty(errors)
)
