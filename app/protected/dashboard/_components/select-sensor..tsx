"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import type { SensorsT } from "@/schemas";
import { searchParamsParser } from "../search-params";
import type { OptionT } from "../types";

type Props = {
  sensorsData: Pick<SensorsT, "id" | "mesured_parameter">[];
  selectedSensorId: string;
};

export function SelectSensor(props: Props) {
  const { sensorsData, selectedSensorId } = props;

  const [qParams, setQParams] = useQueryStates(searchParamsParser, {
    shallow: false,
  });

  const options: OptionT[] = sensorsData.map((item) => {
    return {
      value: item.id,
      label: item.mesured_parameter,
    };
  });

  const defaultValue = options.find(
    (option) => option.value === selectedSensorId
  )?.value;

  const onChange = (value: string) => {
    setQParams(() => {
      return { sensor_id: value };
    });
  };

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Probe" defaultValue={defaultValue} />
      </SelectTrigger>
      <SelectContent className="w-full bg-background">
        {options?.map((option) => {
          const { value, label } = option;
          return (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
