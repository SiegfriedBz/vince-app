"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import type { ProbesT } from "@/schemas";
import { searchParamsParser } from "../search-params";
import { Button } from "@/components/ui/button";
import type { OptionT } from "../types";

type Props = {
  probesData: Pick<ProbesT, "id" | "designation">[];
  selectedProbeId: string;
};

export function SelectProbe(props: Props) {
  const { probesData, selectedProbeId } = props;

  const [qParams, setQParams] = useQueryStates(searchParamsParser, {
    shallow: false,
  });

  const options: OptionT[] = probesData.map((item) => {
    return {
      value: item.id,
      label: item.designation,
    };
  });

  const defaultValue = options.find(
    (option) => option.value === selectedProbeId
  )?.value;

  const onChange = (value: string) => {
    setQParams(() => {
      return { probe_id: value, sensor_id: "" };
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
