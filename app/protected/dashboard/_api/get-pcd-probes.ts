"use server";

import { type PcdsT, Probes } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

type Params = {
  pcdId: PcdsT["id"];
};

const Result = z.array(
  Probes.pick({ id: true, designation: true, latitude: true, longitude: true })
);

export type GetPcdProbesT = z.infer<typeof Result>;

export async function GetPcdProbes(params: Params) {
  const { pcdId } = params;

  const client = await createClient();

  if (!pcdId) return [];

  const { data, error } = await client
    .from("probes")
    .select("id, designation, latitude, longitude")
    .eq("pcd_id", pcdId);

  console.log("====> GetPcdProbes data", data);

  if (error) {
    console.log("====> GetPcdProbes error", error);
  }

  if (!data) {
    return Result.parse([]);
  }

  return Result.parse(data);
}
