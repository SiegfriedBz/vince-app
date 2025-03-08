"use server";

import { type ProbesT, Sensors } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

type Params = {
  probeId: ProbesT["id"];
};

const Result = z.array(
  Sensors.pick({ id: true, mesured_parameter: true, is_active: true })
);

export type GetProbeSensorsT = z.infer<typeof Result>;

export async function GetProbeSensors(params: Params) {
  const { probeId } = params;

  console.log("=====> GetPcdProbes probeId", probeId);

  if (!probeId) return [];

  const client = await createClient();

  const { data, error } = await client
    .from("sensors")
    .select("id, mesured_parameter, is_active")
    .eq("probe_id", probeId);

  if (!data) {
    return Result.parse([]);
  }

  if (error) {
    console.log("====> GetProbeSensors error", error);
  }

  console.log("====> GetProbeSensors data", data);

  return Result.parse(data);
}
