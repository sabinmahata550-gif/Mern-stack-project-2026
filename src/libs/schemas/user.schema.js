import z, { maxLength, minLength, regex } from "zod";
import { emailRejex, passwordRegex } from "../../constants/rejex.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_SUPER_ADMIN } from "../../constants/roles.js";


export const userSchema = z.object({
    name: z.string({ error: "name is required" }).check(minLength(3), maxLength(50)).trim(),
    email: z.string({ error: "Email is required" })
        .regex(emailRejex, { error: "Invalid email address" }).optional(),
    phone: z.string({ error: "Phone is required" })
        .check(minLength(6), maxLength(16)).optional(),
    password: z.string({ error: "Password is required" }).check(minLength(6), regex(passwordRegex, { error: "Password must be contain lowercase uppercas number and spacial character" })),
    roles: z
    .array(z.enum([ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_ADMIN,ROLE_SUPER_ADMIN]))
    .default([ROLE_CUSTOMER]),
    address: z.object({
        street: z.string().optional(),
        city: z.string(),
        district: z.string().optional(),
        province: z.string().optional(),
        country: z.string().default("Nepal")
    })
})
