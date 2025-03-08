"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import type { PcdsT } from "@/schemas";
import { searchParamsParser } from "../search-params";
import { Button } from "@/components/ui/button";
import type { OptionT } from "../types";

type Props = {
  pcdsData: Pick<PcdsT, "id" | "designation">[];
  selectedPcdId: string;
};

export function SelectPcd(props: Props) {
  const { pcdsData, selectedPcdId } = props;

  const [qParams, setQParams] = useQueryStates(searchParamsParser, {
    shallow: false,
  });

  const options: OptionT[] = pcdsData.map((item) => {
    return {
      value: item.id,
      label: item.designation,
    };
  });

  const defaultValue = options.find(
    (option) => option.value === selectedPcdId
  )?.value;

  const onChange = (value: string) => {
    setQParams((prev) => {
      return { probe_id: "", sensor_id: "", pcd_id: value };
    });
  };

  const onClear = () => {
    setQParams(() => {
      return { probe_id: "", sensor_id: "", pcd_id: "" };
    });
  };

  return (
    <div className="flex flex-row-reverse gap-x-2">
      <Button variant="ghost" size="sm" onClick={onClear}>
        Clear
      </Button>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select PCD" defaultValue={defaultValue} />
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
    </div>
  );
}
