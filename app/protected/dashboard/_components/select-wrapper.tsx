"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "../search-params";
import type { OptionT } from "./select-probe-content-wrapper";

type Props = {
  queryParamName: keyof typeof searchParamsParser;
  placeholder: string;
  defaultValue?: string;
  options: OptionT[];
};

export function SelectWrapper(props: Props) {
  const { queryParamName, placeholder, options } = props;

  const [qParams, setQParams] = useQueryStates(searchParamsParser, {
    shallow: false,
  });

  const handleSetQParams = (value: string) => {
    setQParams((prev) => {
      return queryParamName === "pcd_id"
        ? { probe_id: "", sensor_id: "", [queryParamName]: value }
        : { ...prev, [queryParamName]: value };
    });
  };

  const paramValue = qParams[queryParamName] ?? "";

  return (
    <Select onValueChange={handleSetQParams}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} defaultValue={paramValue} />
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
