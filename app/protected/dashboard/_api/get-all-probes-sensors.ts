"use server";

import { type ProbesT, Sensors } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

type Params = {
  probesIds: ProbesT["id"][];
};

const Result = z.array(
  Sensors.pick({ id: true, mesured_parameter: true, is_active: true })
);

export type GetAllProbesSensorsT = z.infer<typeof Result>;

export async function GetAllProbesSensors(params: Params) {
  const { probesIds } = params;

  console.log("=====> GetAllProbesSensors probeId", probesIds);

  if (probesIds?.length === 0) return [];

  const client = await createClient();

  const { data, error } = await client
    .from("sensors")
    .select("id, mesured_parameter, is_active")
    .in("probe_id", probesIds);

  if (!data) {
    return Result.parse([]);
  }

  if (error) {
    console.log("====> GetProbeSensors error", error);
  }

  console.log("====> GetProbeSensors data", data);

  return Result.parse(data);
}
