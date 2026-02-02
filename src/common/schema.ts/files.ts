import * as z from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]

export const imageFile = z.file()
    .max(MAX_UPLOAD_SIZE)
    .mime(ACCEPTED_IMAGE_TYPES)
    .nullable()
