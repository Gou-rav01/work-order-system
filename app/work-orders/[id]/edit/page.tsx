import { getWorkOrder } from '@/lib/data/workOrders';
import { WorkOrderForm } from '@/components/work-order-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import AnimatedPage from '@/components/work-orders/AnimatedPage';

export const revalidate = 0;

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({
  params,
}: EditPageProps) {

  const { id } = await params;
  const order = await getWorkOrder(id);
  if (!order) {
    notFound();
  }
  return (
    <AnimatedPage>
      {/* Back Button */}
      <div>
        <Link
          href={`/work-orders/${id}`}
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-muted-foreground
            hover:text-primary
            transition-colors
          "
        >
          <ChevronLeft
            className="
              h-4
              w-4
              transition-transform
              group-hover:-translate-x-1
            "
          />
          Back to Order
        </Link>
      </div>
      {/* Header */}
      <div>
        <h1
          className="
            text-4xl
            sm:text-5xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-violet-600
            via-fuchsia-600
            to-orange-500
            bg-clip-text
            text-transparent
          "
        >
          Edit Work Order
        </h1>
        <p
          className="
            mt-3
            text-muted-foreground
          "
        >
          Update the work order details and keep your workflow organized.
        </p>
      </div>

      {/* Form */}
      <div
        className="
          card-premium
          p-6
          sm:p-8
        "
      >
        <WorkOrderForm
          initialData={order}
          isEditing
        />
      </div>
    </AnimatedPage>

  );
}