import { z } from "zod";
import { Probes } from "./probes";

export const Sensors = z.object({
  id: z.string().uuid(),
  probe_id: Probes.shape.id,
  designation: z.string(),
  mesured_parameter: z.string(),
  model: z.string(),
  unit: z.string(),
  min_threshold: z.number().default(0),
  max_threshold: z.number().default(10000),
  calibration_duration: z.number().int().default(3),
  last_maintenance_date: z.string(),
  validity_of_calibration: z.boolean().default(true),
  last_update: z.string(),
  is_active: z.boolean().default(true),
  label: z.string(),
});

export type SensorsT = z.infer<typeof Sensors>;
