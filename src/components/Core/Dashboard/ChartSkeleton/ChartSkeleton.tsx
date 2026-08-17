const PieChartSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="h-14 border-b border-gray-200 flex items-center px-6">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="p-6 flex items-center justify-center gap-10 sm:gap-6 lg:gap-10">
        <div className="relative">
          <div className="w-40 h-40 lg:w-60 lg:h-60 rounded-full bg-gray-200 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-gray-300 animate-pulse" />
              <div className="h-4 w-20 sm:w-10 lg:w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ColumnChartSkeleton = () => {
  const bars = ["h-16", "h-28", "h-20", "h-36", "h-24", "h-32"];

  const yAxisLabels = ["10000", "8000", "6000", "4000", "2000", "0"];

  const xAxisLabels = [
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="h-14 border-b border-gray-200 flex items-center px-6">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-105 w-full animate-pulse px-4 pt-4">
        <div className="mb-5 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-gray-200" />
            <div className="h-3 w-12 rounded bg-gray-200" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-gray-200" />
            <div className="h-3 w-14 rounded bg-gray-200" />
          </div>
        </div>

        <div className="flex h-87.5 w-full">
          <div className="flex w-12 shrink-0 flex-col justify-between pb-8 pr-2">
            {yAxisLabels.map((label) => (
              <div key={label} className="h-3 w-full rounded bg-gray-200" />
            ))}
          </div>

          <div className="relative min-w-0 flex-1">
            <div className="absolute inset-x-0 bottom-8 top-0 flex flex-col justify-between">
              {yAxisLabels.map((label) => (
                <div
                  key={label}
                  className="border-t border-dashed border-gray-200"
                />
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-8 top-0 grid grid-cols-4 items-end lg:grid-cols-6">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className={`
                  flex h-full items-end justify-center
                  ${index >= 4 ? "hidden lg:flex" : ""}
                `}
                >
                  <div className={`w-10 rounded-t bg-gray-200 ${height}`} />
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 lg:grid-cols-6">
              {xAxisLabels.map((label, index) => (
                <div
                  key={index}
                  className={`
                  flex justify-center
                  ${index >= 4 ? "hidden lg:flex" : ""}
                `}
                >
                  <div className="h-3 w-12 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PieChartSkeleton, ColumnChartSkeleton };