'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Edit } from 'lucide-react';
import type { WorkOrder } from '@/lib/types';
import { PriorityBadge, StatusBadge } from './badge';
import { formatDistanceToNow } from '@/lib/utils';

interface WorkOrderCardProps {
  order: WorkOrder;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export function WorkOrderCard({
  order,
  onDelete,
  isDeleting,
}: WorkOrderCardProps) {
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(order.id);
  };

  return (
    <div
      onClick={() => router.push(`/work-orders/${order.id}`)}
      className="card-premium hover-lift group cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {order.title}
            </h3>
          </div>

          <PriorityBadge priority={order.priority} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {order.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />

            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(order.updatedAt))}
            </span>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              href={`/work-orders/${order.id}/edit`}
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Edit work order"
            >
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Delete work order"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}