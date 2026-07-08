export function CardSkeleton() {
  return (
    <div className="card-premium space-y-4">
      <div className="space-y-3">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
      <div className="flex gap-2 pt-4">
        <div className="skeleton h-6 w-20" />
        <div className="skeleton h-6 w-24" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
