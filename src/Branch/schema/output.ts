import * as z from "zod"
import { authorsPayload, member, slimMember } from "./authors"
import { branchSch, posts } from "./input"
import { imageFile } from "../../common/schema.ts/files"

const branchTitle = z.string()
  .trim()
  .min(1, { message: 'Required' })
  .regex(/^[^<>;]*$/, 'Invalid input!')
  .refine((value) => value.trim().split(' ').length <= 3, 'Up to 3 words!')

export const branch = branchSch.extend({
  title: branchTitle,
}).required({title: true})

export const formSchema = z.object({
  branch: branch,
  branch_genres: z.array(z.coerce.number()),
  members: z.array(member).min(1, { message: "Please select at least team leader." }),
  posts: posts,
  masterId: z.coerce.number().positive(),
  bgImg: imageFile,
  cover: imageFile,
  authorsPayload,
});

export const finalSchema = formSchema.omit({
  masterId: true,
  authorsPayload: true,
}).extend({
  members: z.array(slimMember),
  branch_genres: z.array(z.coerce.number()).min(1, { message: "Please select at least one option." }),
  draft: z.number().positive().nullable().optional()
})

export const draftSchema = formSchema.omit({
  masterId: true,
  authorsPayload: true,
}).extend({
  draft: z.number().positive().nullable().optional()
})

export type FormData = z.infer<typeof finalSchema>
export type DraftData = z.infer<typeof draftSchema>
