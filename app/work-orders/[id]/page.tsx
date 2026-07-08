'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import { PriorityBadge, StatusBadge } from '@/components/badge';
import { ConfirmDialog } from '@/components/dialog';
import { useToast } from '@/components/toast';
import type { WorkOrder } from '@/lib/types';
import { formatDistanceToNow } from '@/lib/utils';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default function DetailPage({ params }: DetailPageProps) {
  const [order, setOrder] = useState<WorkOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { success, error } = useToast();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/work-orders/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        error('Failed to load work order');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id, error]);

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/work-orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      success('Work order deleted successfully');
      router.push('/work-orders');
    } catch (err) {
      error('Failed to delete work order');
    } finally {
      setIsDeleting(false);
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 rounded-lg bg-muted animate-pulse" />
        <div className="h-40 w-full rounded-lg bg-muted animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <Link
          href="/work-orders"
          className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Orders
        </Link>
        <div className="card-premium p-8 text-center">
          <p className="text-foreground text-lg font-medium">Work order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/work-orders"
        className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      {/* Header with actions */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{order.title}</h1>
          <p className="text-muted-foreground mt-1">
            Created {formatDistanceToNow(new Date(order.createdAt))}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/work-orders/${order.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-blue-600 transition-colors font-medium"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card-premium p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
            <p className="text-foreground whitespace-pre-wrap">{order.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status Card */}
          <div className="card-premium p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Status</h3>
            <StatusBadge status={order.status} />
          </div>

          {/* Priority Card */}
          <div className="card-premium p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Priority</h3>
            <PriorityBadge priority={order.priority} />
          </div>

          {/* Timestamps */}
          <div className="card-premium p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Created</p>
              <p className="text-sm text-foreground">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Last Updated</p>
              <p className="text-sm text-foreground">
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteOpen}
        title="Delete Work Order"
        description="This action cannot be undone. Are you sure you want to delete this work order?"
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
