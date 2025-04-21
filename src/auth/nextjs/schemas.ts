import { z } from "zod"

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
}) 

export const signUpSchema = z.object({
    name : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(8),
    confirmation: z.string().min(8),
})