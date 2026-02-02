import * as z from "zod"
import { imageFile } from "common/schema.ts/files"

export const userData = z.object({
    id: z.number().positive().nullable(),
    name: z.string().trim()
        .min(1, { message: 'Required' })
        .regex(/^[^<>;]*$/, 'Invalid input!'),
    email: z.email().trim()
        .min(6, { message: 'Required' }),
    dob: z.iso.date().nullable(),
    phone: z.coerce.number().nullable(),
    sex: z.coerce.number().min(0).max(1).nullable(),
    file: imageFile.nullish(),
})

export const passwordSchema = z.object({
  password: z.string().min(5, "Password must be at least 5 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type UserData = z.infer<typeof userData>
export type ConfirmPassword = z.infer<typeof passwordSchema>
