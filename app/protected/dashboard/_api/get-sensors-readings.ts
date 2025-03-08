"use server";

import {
  Pcds,
  Probes,
  SensorReadings,
  Sensors,
  type SensorsT,
} from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import type { z } from "zod";

type Params = {
  sensorIds: SensorsT["id"][];
};

const Result = SensorReadings.pick({
  id: true,
  validated_value: true,
  reading_quality: true,
  reading_timestamp: true,
})
  .extend({
    sensor: Sensors.pick({
      id: true,
      designation: true,
      mesured_parameter: true,
      unit: true,
      label: true,
    }).extend({
      probe: Probes.pick({ id: true, designation: true }).extend({
        pcd: Pcds.pick({ id: true, designation: true }),
      }),
    }),
  })
  .array();

export type GetSensorsReadingsT = z.infer<typeof Result>;

export async function GetSensorsReadings(params: Params) {
  const { sensorIds } = params;

  console.log("=====> GetReadings sensorIds", sensorIds);

  if (sensorIds?.length === 0) return [];

  const client = await createClient();

  const { data, error } = await client
    .from("sensor_readings")
    .select(
      "id, validated_value, reading_quality, reading_timestamp, sensor:sensors!sensor_id (id, designation, mesured_parameter, unit, label, probe:probes!probe_id (id, designation, pcd:pcds!pcd_id (id, designation)))"
    )
    // .eq("reading_quality", true)
    .in("sensor_id", sensorIds);
  // .maybeSingle();

  console.log("====> GetReadings data", data);

  if (!data) {
    return Result.parse([]);
  }

  if (error) {
    console.log("====> GetReadings error", error);
  }

  console.log("====> GetReadings data", data);

  return Result.parse(data);
}
