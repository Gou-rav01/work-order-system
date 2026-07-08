import type { WorkOrderPriority, WorkOrderStatus } from '@/lib/types';

interface PriorityBadgeProps {
  priority: WorkOrderPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const className = `badge-priority badge-${priority.toLowerCase()}`;
  return <span className={className}>{priority}</span>;
}

interface StatusBadgeProps {
  status: WorkOrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusKey = status === 'In Progress' ? 'in-progress' : status.toLowerCase();
  const className = `badge-status badge-${statusKey}`;
  return <span className={className}>{status}</span>;
}
