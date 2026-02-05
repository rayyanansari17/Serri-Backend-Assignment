// const Loaders = () => {
//   return (
//     <div className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
//       <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md" />
//       <div className="flex flex-col gap-2">
//         <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
//         <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md" />
//         <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
//         <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md" />
//       </div>
//     </div>
//   );
// }

// export default Loaders;


const Loaders = () => {
  return (
    <div className="w-64 overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="h-36 w-full bg-gray-200 animate-pulse" />

      <div className="px-3 py-2 animate-pulse">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />

        <div className="mt-3 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>

        <div className="mt-2 h-3 w-2/5 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default Loaders;
