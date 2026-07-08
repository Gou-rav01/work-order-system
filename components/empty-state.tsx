import Link from 'next/link';
import { Plus, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showCreateButton?: boolean;
}

export function EmptyState({
  title = 'No work orders yet',
  description = 'Get started by creating your first work order',
  showCreateButton = true,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-muted p-4 mb-6">
        <Inbox className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>
      {showCreateButton && (
        <Link
          href="/work-orders/create"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus className="h-5 w-5" />
          Create Work Order
        </Link>
      )}
    </div>
  );
}
