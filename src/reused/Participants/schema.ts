import * as z from "zod"

const authorsFilters = z.array(z.string())
const authorsPermissions = z.object({}).catchall(z.number())
const authorsStatuses = z.object({}).catchall(z.number())

export const member = z.object({
    id: z.number().int().positive(),
    role: z.number().int().min(0).max(255),
    status: z.number().int().min(0).max(255),
    alias: z.string(),
})

export const slimMember = member.transform((input) => ({
    author_id: input.id,
    role: input.role,
    status: input.status,
}))

const authorsFilterSearch = z.string()
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

export const authorsPayload = z.object({
    filter: z.optional(authorsFilterSearch),
    search: z.optional(authorsFilterSearch),
    page: z.optional(z.number().positive()),
    limit: z.optional(z.number().positive()),
}).optional()

export const ownAuthors = z.array(author)

export type Member = z.infer<typeof member>
export type Author = z.infer<typeof author>
export type Authors = z.infer<typeof authorsSch>
export type OwnAuthors = z.infer<typeof ownAuthors>
export type AuthorsPayload = z.infer<typeof authorsPayload>

export type AuthorsFilters = z.infer<typeof authorsFilters>
export type Statuses = z.infer<typeof authorsStatuses>
export type Permissions = z.infer<typeof authorsPermissions>
