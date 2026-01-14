import { z } from "zod";

export const RegisterAuthSchema = z.object({
  name: z.string({
    message: "Username required!",
  }),
  email: z.string().email({
    message: "Invalid email format. Must be like 'user@domain.com'.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." })
    .regex(/[0-9]/, { message: "Password requires at least one number." }),
});

export const LoginAuthSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Must be like 'user@domain.com'.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." })
    .regex(/[0-9]/, { message: "Password requires at least one number." }),
});
