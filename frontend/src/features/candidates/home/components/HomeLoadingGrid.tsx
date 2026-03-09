export function HomeLoadingGrid() {
  return (
    <section className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`loading-${index}`}
          className="h-72 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 animate-pulse"
        ></div>
      ))}
    </section>
  )
}
