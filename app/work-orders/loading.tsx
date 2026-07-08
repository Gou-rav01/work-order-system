import { CardSkeletonGrid } from '@/components/skeleton';

export default function WorkOrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-40 rounded-lg bg-muted animate-pulse" />
        <div className="h-4 w-64 rounded-lg bg-muted animate-pulse" />
      </div>
      <CardSkeletonGrid />
    </div>
  );
}
