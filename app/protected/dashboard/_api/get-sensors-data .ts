"use server";

import { Pcds, Probes, type ProbesT, SensorReadings, Sensors } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

type Params = {
  probeId: ProbesT["id"];
};

const Result = z.array(
  Sensors.pick({
    id: true,
    mesured_parameter: true,
    designation: true,
    is_active: true,
    unit: true,
    label: true,
  })
    .extend({
      readings: SensorReadings.pick({
        id: true,
        validated_value: true,
        reading_quality: true,
        reading_timestamp: true,
      }).array(),
    })
    .extend({
      probe: Probes.pick({ id: true, designation: true }).extend({
        pcd: Pcds.pick({ id: true, designation: true }),
      }),
    })
);

export type GetSensorsDataT = z.infer<typeof Result>;

export async function GetSensorsData(params: Params) {
  const { probeId } = params;

  console.log("=====> GetSensorsData probeId", probeId);

  if (!probeId) return [];

  const client = await createClient();

  const { data, error } = await client
    .from("sensors")
    .select(
      // "id, designation, mesured_parameter, is_active, unit, label, probe:probes!probe_id (id, designation, pcd:pcds!pcd_id (id, designation)))"
      "id, designation, mesured_parameter, is_active, unit, label, readings:sensor_readings!sensor_id (id, validated_value, reading_quality, reading_timestamp), probe:probes(id, designation, pcd:pcds!pcd_id (id, designation)))"
    )
    .eq("probe_id", probeId);

  console.log("====> GetSensorsData data", data?.[0]);

  if (!data) {
    return Result.parse([]);
  }

  if (error) {
    console.log("====> GetSensorsData error", error);
  }

  return Result.parse(data);
}
