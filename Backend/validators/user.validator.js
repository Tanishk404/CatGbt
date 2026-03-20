import { z } from 'zod';

export const UserValidation = z.object({
    fullname: z.string().min(3, "Username to short").trim(),
    emailid: z.string().email("Invalid email").trim().toLowerCase(),
    password: z.string().min(8, "Password must be 8+ chars"),
})


export const LoginValidation = z.object({
    emailid: z.string().email(),
    password: z.string().min(8)
})