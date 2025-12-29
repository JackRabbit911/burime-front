import * as z from "zod"
import { imageFile } from "../common/schema.ts/files"

export const authorSchema = z.object({
    id: z.number().optional(),
    alias: z.string().trim().min(1, { message: 'Required' }).regex(/^[^<>;]*$/, 'Invalid input!'),
    info: z.object({
        slogan: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
        info: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
    }),
    openclosed: z.coerce.number<number>(),
    owner: z.boolean().optional(),
    avatar: z.string().optional(),
    file: imageFile.nullish(),
})

export const authorOut = authorSchema.omit({
    owner: true,
    avatar: true,
})

export type MyAuthor = z.infer<typeof authorSchema>
export type MyAuthorOut = z.infer<typeof authorOut>
