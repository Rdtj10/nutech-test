import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    first_name: z.string().min(1, "Nama depan wajib diisi"),
    last_name: z.string().min(1, "Nama belakang wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
