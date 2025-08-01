import { z } from "zod";

export const ServiceSchema = z.object({
  service_code: z.string(),
  service_name: z.string(),
  service_icon: z.string().url(),
  service_tariff: z.number(),
});

export const BannerSchema = z.object({
  banner_name: z.string(),
  banner_image: z.string(),
  description: z.string(),
});

export type IBanner = z.infer<typeof BannerSchema>;
export type IService = z.infer<typeof ServiceSchema>;
