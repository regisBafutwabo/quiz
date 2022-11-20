export const Skeleton = () => {
  return (
    <div className="mb-4 rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 p-6 text-white shadow-lg">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="mb-3 flex h-4 w-1/6 rounded bg-gray-300"></div>
          <div className="h-6 w-3/4 rounded bg-gray-300"></div>
          <div className="space-y-3">
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="my-3 rounded-xl bg-gray-300 p-7 shadow-lg max-sm:w-full sm:m-3 sm:w-1/3"></div>
              <div className="my-3 rounded-xl bg-gray-300 p-7 shadow-lg max-sm:w-full sm:m-3 sm:w-1/3"></div>
              <div className="my-3 rounded-xl bg-gray-300 p-7 shadow-lg max-sm:w-full sm:m-3 sm:w-1/3"></div>
              <div className="my-3 rounded-xl bg-gray-300 p-7 shadow-lg max-sm:w-full sm:m-3 sm:w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
