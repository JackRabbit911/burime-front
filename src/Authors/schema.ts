import * as z from "zod"
import { imageFile } from "../common/schema.ts/files"

export const authorSchema = z.object({
    id: z.number(),
    alias: z.string().trim().min(1, { message: 'Required' }).regex(/^[^<>;]*$/, 'Invalid input!'),
    slogan: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
    info: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
    openclosed: z.coerce.number(),
    owner: z.boolean(),
    avatar: z.string(),
    file: imageFile.nullish(),
})

export type MyAuthor = z.infer<typeof authorSchema>
