"use client";

import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { FC } from "react";
import type {
  CustomLineChartDataT,
  FormatedReading,
} from "@/app/protected/dashboard/types";

// Custom Tooltip content to display value and timestamp
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const customTooltip = ({ payload, label }: any) => {
  if (payload?.length) {
    const { value } = payload[0]; // Get the value for the first series
    const date = new Date(label);
    const formattedTime = format(date, "yy/MM/d");

    return (
      <div className="flex flex-col font-bold">
        <span>Value: {value}</span>
        <span>Date: {formattedTime}</span>
      </div>
    );
  }
  return null;
};

const chartConfig = {
  desktop: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  data: CustomLineChartDataT;
};

export const CustomLineChart: FC<Props> = (props) => {
  const { pcd, probe, sensor } = props.data;

  const title = `${pcd.designation} | ${probe.designation} `;
  const unit = sensor.unit;
  const description = `${sensor.measuredParameter} | ${unit}`;

  const chartData = sensor.readings.map((d) => {
    return {
      timestamp: d.timestamp,
      value: d.value,
    };
  });

  const formatXAxis = (tick: string) => {
    const date = new Date(tick);
    return format(date, "yy MM d"); // Format as "24 07 8" (e.g. 24 07 08 for "2024-07-08")
  };

  return (
    <Card className="min-w-96 xl:min-w-[32rem]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 4,
              right: 4,
              top: 4,
              bottom: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              angle={-45}
              textAnchor="end"
              dataKey="timestamp"
              tickFormatter={formatXAxis}
            />
            <YAxis
              label={{
                value: unit ? `(${unit})` : "", // Add the unit in parentheses
                angle: -90, // Rotate the label for better positioning
                position: "insideLeft", // Position the label inside the chart
              }}
            />

            <Tooltip content={customTooltip} />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
