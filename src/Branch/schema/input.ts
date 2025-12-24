import * as z from "zod"
import { member, ownAuthors } from "./authors"

const genre = z.object({
    id: z.number().positive(),
    title: z.string(),
})

const filesBase64 = z.object({
    cover: z.string().nullable(),
    bg_img: z.string().nullable(),
})

const genreSch = z.array(genre)

const authorsFilters = z.array(z.string())
const authorsPermissions = z.object({}).catchall(z.number())
const authorsStatuses = z.object({}).catchall(z.number())

const intro = (max: number) => z.string()
  .trim()
  .regex(/^[^<>;]*$/, 'Invalid input!')
  .refine((value) => value.trim().split(' ').length <= max, `Up to ${max} words!`)

const post = z.object({
    id: z.number().nullable().optional(),
    body: intro(200),
    author_id: z.coerce.number().nullable(),
})

export const regString = z.string().trim().regex(/^[^<>;]*$/, 'Invalid input!')

export const info = z.object({
  allow_comments: z.coerce.number().min(0).max(1),
  moderation: z.coerce.number().min(0).max(1),
  signature: z.coerce.number().min(0).max(1),
  post_size: z.number().int().positive(),
  time_limit: z.number().int().positive(),
  rules: regString,
  description: regString,
})

export const cover = z.object({
  bg_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format."),
  text_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format."),
  text_size: z.coerce.number().int().min(5).max(50),
  bg_img: regString,
  cover: regString,
})

export const posts = z.object({
    first: post,
    last: post,
})

export const branchSch = z.strictObject({
    id: z.number().positive().nullable(),
    parent_id: z.number().positive().nullable(),
    owner: z.number().positive().nullable(),
    title: z.string(),
    role: z.coerce.number().nonnegative(),
    age_limit: z.number().nonnegative(),
    cover: cover,
    info: info,
})

export const bootstrapSch = z.object({
    total_genres: z.array(genreSch),
    branch_genres: z.array(z.number().positive()),
    branch: branchSch,
    members: z.array(member),
    posts: posts,
    files: filesBase64,
    ownAuthors: ownAuthors,
    authorsFilters,
    authorsPermissions,
    authorsStatuses,
    draft: z.number().positive().nullable().optional(),
})

export type Bootstrap = z.infer<typeof bootstrapSch>
export type Genre = z.infer<typeof genreSch>
export type AuthorsFilters = z.infer<typeof authorsFilters>
export type Statuses = z.infer<typeof authorsStatuses>
export type Permissions = z.infer<typeof authorsPermissions>
