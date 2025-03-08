import { ProbesT } from "@/schemas";

export type OptionT = {
  value: string;
  label: string;
};

export type FormatedReading = {
  pcdDesignation: string;
  probeDesignation: string;
  sensorDesignation: string;
  unit: string;
  measuredParameter: string;
  value: number;
  timestamp: string;
  readingQuality: boolean;
};

export type CustomLineChartDataT = {
  pcd: {
    designation: string;
  };
  probe: {
    designation: string;
  };
  sensor: {
    designation: string;
    unit: string;
    measuredParameter: string;
    readings: {
      id: string;
      value: number;
      quality: boolean;
      timestamp: string;
    }[];
  };
};
