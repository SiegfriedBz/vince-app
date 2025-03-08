import { z } from "zod";
import { Pcds } from "./pcds";

export const Probes = z.object({
  id: z.string().uuid(),
  pcd_id: Pcds.shape.id,
  manufacturer_id: z.string().uuid(),
  designation: z.string(),
  description: z.string(),
  model: z.string(),
  full_address: z.string(),
  number_of_parameters: z.number().int().default(1),
  installed_by: z.string(),
  installation_date: z.string(),
  last_maintenance_date: z.string(),
  last_update: z.string(),
  company_id: z.string().uuid(),
  is_active: z.boolean().default(true),
  location: z.any(), // TODO geography
  latitude: z.number(),
  longitude: z.number(),
});

export type ProbesT = z.infer<typeof Probes>;
