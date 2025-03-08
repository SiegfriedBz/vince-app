import { z } from "zod";

export const Pcds = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  manufacturer_id: z.string().uuid(),
  designation: z.string(),
  label: z.string(),
  model: z.string(),
  transmission_mode: z.string(),
  full_address: z.string(),
  installation_date: z.string(),
  last_maintenance_date: z.string(),
  last_update: z.string(),
  is_active: z.boolean().default(true),
  description: z.string(),
  location: z.any(), // TODO geography
  latitude: z.number(),
  longitude: z.number(),
});

export type PcdsT = z.infer<typeof Pcds>;
