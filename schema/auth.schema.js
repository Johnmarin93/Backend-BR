import {z} from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: 'name is required'
    }),
    username: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid Email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(5,{
        message: 'Password must be  at least 5 characters'
    }),
    rol: z.string({
        required_error: 'rol is required'
    }),

})

export const loginSchema = z.object({
    username: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid Email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(5,{
        message: 'Password must be  at least 5 characters'
    }),

})