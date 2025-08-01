import { z } from "zod";

export const ProfileSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  profile_image: z.string(),
});

export const UpdateProfileSchema = z.object({
  first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
  last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
});

export type IUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;
export type IProfile = z.infer<typeof ProfileSchema>;
