import * as z from "zod"
import { imageFile } from "common/schema.ts/files"

const member = z.object({
    id: z.number().int().positive(),
    role: z.number().int().min(0).max(255),
    status: z.number().int().min(0).max(255),
    alias: z.string(),
})

const authorSchema = z.object({
    id: z.number().optional(),
    alias: z.string().trim().min(1, { message: 'Required' }).regex(/^[^<>;]*$/, 'Invalid input!'),
    info: z.object({
        slogan: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
        info: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
    }),
    openclosed: z.coerce.number<number>(),
    owner: z.boolean().optional(),
    avatar: z.string().optional(),
})

export const formInputSchema = z.object({
    author: authorSchema,
    masterId: z.coerce.number(),
    file: imageFile.nullish(),
    members: z.array(member).optional()
})

const authorOutSch = authorSchema.transform((input) => ({
    id: input.id,
    alias: input.alias,
    info: input.info,
    openclosed: input.openclosed,
}))

const slimMember = member.transform((input) => ({
    child_id: input.id,
    role: input.role,
    status: input.status,
    alias: input.alias,
}))

export const formOutputSchema = z.object({
    author: authorOutSch,
    file: imageFile.nullish(),
    members: z.array(slimMember).optional(),
})

export type FormInputType = z.infer<typeof formInputSchema>
export type MyAuthor = z.infer<typeof authorSchema>
export type FormOutputType = z.infer<typeof formOutputSchema>
