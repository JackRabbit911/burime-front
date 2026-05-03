import * as z from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]

export const imageFile = z.file()
    .max(MAX_UPLOAD_SIZE, {message: 'The file size exceeds the allowed limit'})
    .mime(ACCEPTED_IMAGE_TYPES, {message: 'The file must be an image'})
    .nullable()
