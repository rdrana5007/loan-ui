"use client";
import { StatusChartItem } from "@/types";
import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { FC, useMemo } from "react";
import { ChartSkeleton } from "../ChartSkeleton";
import { EMPTY_CHART } from "@/constants";

interface StatusChartProps {
  title: string;
  data: StatusChartItem[];
  isLoading: boolean;
  colorDomain: string[];
  colorRange: string[];
}

export const StatusChart: FC<StatusChartProps> = ({
  title,
  data,
  isLoading,
  colorDomain,
  colorRange,
}) => {
  const isEmpty: boolean =
    !data || data?.length === 0 || data?.every((item) => item.value === 0);

  const chartData = isEmpty ? EMPTY_CHART.data : data;

  const config = useMemo(
    () => ({
      data: chartData,
      angleField: "value",
      colorField: "type",
      autoFit: true,
      height: 300,
      scale: {
        color: isEmpty
          ? {
              domain: EMPTY_CHART.domain,
              range: EMPTY_CHART.range,
            }
          : {
              domain: colorDomain,
              range: colorRange,
            },
      },
      label: {
        text: isEmpty ? " " : "value",
        style: {
          fontWeight: "bold",
        },
      },
      legend: {
        color: {
          title: true,
          position: "right",
          layout: {
            justifyContent: "center",
          },
        },
      },
      tooltip: isEmpty
        ? false
        : {
            items: [
              (datum: StatusChartItem) => ({
                name: datum.type,
                value: datum.value,
              }),
            ],
          },
    }),
    [data, colorDomain, colorRange, isEmpty],
  );

  if (isLoading) return <ChartSkeleton />;

  return (
    <Card
      title={title}
      style={{ borderRadius: 8 }}
      styles={{ body: { padding: 8 } }}
    >
      <Pie key={`${title}-${isEmpty}`} {...config} />
    </Card>
  );
};
