import type { FieldErrors, FieldValues } from "react-hook-form"

import { isObjectEmpty } from "common/utils"
import type { Author } from "reused/Participants/schema"

export const submitDisabled = (author: Author | undefined, errors: FieldErrors<FieldValues>) => (
    author === undefined || author?.alias == '' || !isObjectEmpty(errors)
)
