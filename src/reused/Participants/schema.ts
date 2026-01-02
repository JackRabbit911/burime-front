import * as z from "zod"

export const authorsFilterSearch = z.string()
    .trim()
    .regex(/^[^<>]*$/, 'Invalid input!')
    .nullable()
    .optional()

const author = z.object({
    id: z.number().positive(),
    alias: z.string(),
})

export const authorsSch = z.object({
    list: z.array(author),
    count: z.number().nonnegative().int(),
})


export type Author = z.infer<typeof author>
export type Authors = z.infer<typeof authorsSch>
