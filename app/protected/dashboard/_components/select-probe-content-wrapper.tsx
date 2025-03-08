import { SelectItem } from "@/components/ui/select";
import { searchParamsCache, type searchParamsParser } from "../search-params";
import { GetPcdProbes, type GetPcdProbesT } from "../_api/get-pcd-probes";

export type OptionT = {
  value: string;
  label: string;
};

type Props = {
  queryParam: keyof typeof searchParamsParser;
};

export const SelectProbeContentWrapper = async (props: Props) => {
  // 1. Get pcdId from params cache
  const { queryParam } = props;

  // 1. Get default value from params cache
  const defaultValue = searchParamsCache?.get(queryParam) ?? "";

  console.log("=====> SelectProbeContentWrapper pcdId", defaultValue);

  // 2.
  const probesData: GetPcdProbesT = await GetPcdProbes({
    pcdId: defaultValue,
  });

  const options = probesData?.map((probe) => {
    return {
      value: probe.id,
      label: probe.designation,
    } satisfies OptionT;
  });

  return (
    <div className="w-full bg-background">
      {options?.map((option) => {
        const { value, label } = option;
        return (
          <SelectItem key={value} value={value} defaultValue={defaultValue}>
            {label}
          </SelectItem>
        );
      })}
    </div>
  );
};
