import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must be less than 50 characters.",
    }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
    message: "Invalid phone number.",
  }),
});
