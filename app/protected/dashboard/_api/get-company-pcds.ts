"use server";

import { Pcds, type PcdsT } from "@/schemas";
import { createClient } from "@/utils/supabase/server";
import type { z } from "zod";

const Result = Pcds.pick({ id: true, designation: true }).array();

export type GetCompanyPcdsT = z.infer<typeof Result>;

type Params = {
  // TODO Create Company Table Schema
  companyId: PcdsT["id"];
};

export async function GetCompanyPcds(params: Params) {
  const { companyId } = params;

  const client = await createClient();

  const { data, error } = await client
    .from("pcds")
    .select("id, designation")
    .eq("company_id", companyId);

  if (error) {
    console.log("====> GetCompanyPcds error", error);
  }

  const parsedData = Result.parse(data);

  return parsedData;
}
