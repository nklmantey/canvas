import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string({ required_error: 'name is required' }).min(1, { message: 'name is required' }),
  email: z.string({ required_error: 'email is required' }).email({ message: 'invalid email address' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(8, { message: 'password must be at least 8 characters long' }),
})
export type SignupInput = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email({ message: 'invalid email address' }),
  password: z.string({ required_error: 'password is required' }),
})
export type LoginInput = z.infer<typeof loginSchema>
