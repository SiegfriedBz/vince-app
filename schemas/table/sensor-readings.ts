import { z } from "zod";
import { Sensors } from "./sensors";

export const SensorReadings = z.object({
  id: z.string().uuid(),
  sensor_id: Sensors.shape.id,
  sensor_label: z.string(),
  unit: z.string(),
  raw_value: z.string(),
  validated_value: z.number().default(0),
  reading_quality: z.boolean().default(true),
  reading_timestamp: z.string(),
  file_source: z.string(),
});

export type SensorReadingsT = z.infer<typeof SensorReadings>;
