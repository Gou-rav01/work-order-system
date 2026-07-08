import { WorkOrderForm } from '@/components/work-order-form';
import AnimatedPage from '@/components/work-orders/AnimatedPage';

export default function CreatePage() {

  return (
    <AnimatedPage>
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
          Create Work Order
        </h1>
        <p
          className="
            mt-3
            text-muted-foreground
            text-base
          "
        >
          Fill in the details to create a new work order and keep your workflow organized.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="
          card-premium
          p-6
          sm:p-8
        "
      >
        <WorkOrderForm />
      </div>
    </AnimatedPage>
  );
}