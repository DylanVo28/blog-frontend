export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04]">
      <div className="aspect-[2/3] animate-pulse bg-white/10" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-2/5 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function MovieRowSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-48 animate-pulse rounded-full bg-white/10" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
