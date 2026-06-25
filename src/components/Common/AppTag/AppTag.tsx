import { Tag } from "antd";

type AppTagProps<T extends string> = {
  value?: T;
  labelMap: Record<T, string>;
  colorMap: Record<T, string>;
  fallback?: string;
};

export const AppTag = <T extends string>({
  value,
  labelMap,
  colorMap,
  fallback = "--",
}: AppTagProps<T>) => {
  if (!value) return <span>{fallback}</span>;
  return (
    <Tag
      color={colorMap[value] ?? "default"}
      variant="solid"
      className="font-bold"
    >
      {labelMap[value] ?? fallback}
    </Tag>
  );
};
