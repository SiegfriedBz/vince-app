import { SelectItem } from "@/components/ui/select";
import { searchParamsCache, type searchParamsParser } from "../search-params";
import {
  GetProbeSensors,
  type GetProbeSensorsT,
} from "../_api/get-probe-sensors";

export type OptionT = {
  value: string;
  label: string;
};

type Props = {
  queryParam: keyof typeof searchParamsParser;
};

export const SelectSensorContentWrapper = async (props: Props) => {
  const { queryParam } = props;

  // 1. Get default value from params cache
  const defaultValue = searchParamsCache?.get(queryParam) ?? "";

  console.log("=====> SelectSensorContentWrapper pcdId", defaultValue);

  // 2.
  const sensorsData: GetProbeSensorsT = await GetProbeSensors({
    probeId: defaultValue,
  });

  const options = sensorsData?.map((sensor) => {
    return {
      value: sensor.id,
      label: sensor.mesured_parameter,
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
