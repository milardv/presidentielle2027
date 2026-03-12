export function HomeLoadingGrid() {
  return (
    <section className="py-10">
      <div className="mb-6">
        <div className="h-4 w-40 rounded-full bg-slate-100 animate-pulse" />
        <div className="mt-3 h-8 w-80 max-w-full rounded-full bg-slate-100 animate-pulse" />
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        <div className="flex gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`loading-${index}`}
              className="h-[35rem] w-[18.75rem] flex-none rounded-[1.85rem] border border-slate-200 bg-slate-100 animate-pulse sm:w-[20.5rem]"
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
