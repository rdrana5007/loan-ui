"use client";
import { Card } from "antd";
import { FC } from "react";
import { Column } from "@ant-design/plots";
import { IncomeExpenseChartItem } from "@/types";

interface TooltipItem {
  name: string;
  value: number | string;
  color: string;
}

interface TooltipRenderProps {
  title: string;
  items: TooltipItem[];
}

interface IncomeExpenseChartProps {
  title: string;
  data: IncomeExpenseChartItem[];
  isLoading: boolean;
}

export const IncomeExpenseChart: FC<IncomeExpenseChartProps> = ({
  title,
  data,
  isLoading,
}) => {
  const config = {
    data,
    xField: "month",
    yField: "value",
    colorField: "type",
    stack: true,
    autoFit: true,
    padding: [10, 10, 10, 10],
    interaction: {
      tooltip: {
        render: (_: unknown, { title, items }: TooltipRenderProps) => {
          return (
            <div key={title}>
              <h4>{title}</h4>
              {items?.map((item) => {
                const { name, value, color } = item;
                return (
                  <div
                    key={`${name}-${color}`}
                    style={{
                      margin: 0,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: color,
                          marginRight: 6,
                        }}
                      ></span>
                      <span>{name}</span>
                    </div>
                    <b>{value}</b>
                  </div>
                );
              })}
            </div>
          );
        },
      },
    },
  };

  return (
    <Card
      title={title}
      style={{ borderRadius: 8 }}
      styles={{ body: { padding: 8 } }}
    >
      <Column {...config} />
    </Card>
  );
};
