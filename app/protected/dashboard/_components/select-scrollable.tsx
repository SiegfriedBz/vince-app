"use client";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryStates } from "nuqs";

import { searchParamsParser } from "../search-params";

type Props = {
  placeholder: string;
  queryParam: keyof typeof searchParamsParser;
  children: React.ReactNode;
};

export function SelectScrollable(props: Props) {
  const { placeholder, queryParam, children } = props;

  const [qParams, setQParams] = useQueryStates(searchParamsParser, {
    shallow: false,
  });

  const defaultValue = qParams[queryParam] ?? "";

  const pcdIdInQParams = qParams.pcd_id != null;
  const probeIdInQParams = qParams.probe_id != null;

  const probeSelectIsDisabled = !pcdIdInQParams && queryParam !== "pcd_id";
  const sensorSelectIsDisabled = !probeIdInQParams && queryParam !== "pcd_id";
  const isDisabled = probeSelectIsDisabled || sensorSelectIsDisabled;

  const handleSetParams = (value: string) => {
    setQParams((prev) => {
      return queryParam === "pcd_id"
        ? { probe_id: "", sensor_id: "", [queryParam]: value }
        : { ...prev, [queryParam]: value };
    });
  };

  return (
    <Select
      // disabled={isDisabled}
      onValueChange={handleSetParams}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      {children}
    </Select>
  );
}
