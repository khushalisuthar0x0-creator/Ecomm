import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(100),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .max(100)
    .regex(/[0-9]/, "Must include a number"),
});
export type RegisterValues = z.infer<typeof registerSchema>;

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  address: z.string().trim().min(4, "Required").max(200),
  city: z.string().trim().min(2, "Required").max(80),
  postalCode: z.string().trim().min(3, "Required").max(20),
  country: z.string().trim().min(2, "Required").max(80),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;
