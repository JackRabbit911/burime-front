import * as z from "zod"

export const helpInputSch = z.string()

const helpSch = z.object({
    key: z.string(),
    body: z.string(),
})

export type Help = z.infer<typeof helpSch>
