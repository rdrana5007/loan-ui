export const ChartSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="h-14 border-b border-gray-200 flex items-center px-6">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="p-6 flex items-center justify-center gap-10 sm:gap-6 lg:gap-10">
        <div className="relative">
          <div className="w-60 h-60 sm:w-40 sm:h-40 lg:w-60 lg:h-60 rounded-full bg-gray-200 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
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
