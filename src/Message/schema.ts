import * as z from "zod"

const recipient = z.object({
    id: z.number(),
    alias: z.string(),
})

const undefinedIfEmpty = z.string()
    .regex(/^[^<>;]*$/, 'Invalid input!')
    .transform(val => val === "" ? undefined : val)
    .optional()

const data = z.object({
    appeal: undefinedIfEmpty,
    body: z.string().regex(/^[^<>;]*$/, 'Invalid input!'),
    signature: undefinedIfEmpty,
}).catchall(z.string()
    .regex(/^[^<>;]*$/, 'Invalid input!')
    .optional()
)

const message = z.object({
    from: z.coerce.number(),
    subject: z.string().trim()
        .min(1, { message: 'Required' })
        .regex(/^[^<>;]*$/, 'Invalid input!'),
    data: data,
})

export const messageForm = z.object({
    recipients: z.array(recipient),
    message: message,
    important: z.boolean(),
})

export type NewRecipient = z.infer<typeof recipient>
export type MessageForm = z.infer<typeof messageForm>
