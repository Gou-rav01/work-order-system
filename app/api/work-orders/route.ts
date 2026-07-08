import { getAllWorkOrders, createWorkOrder } from '@/lib/data/workOrders';
import { createWorkOrderSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

// Disable caching for real-time data
export const revalidate = 0;

export async function GET() {
  try {
    const orders = await getAllWorkOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching work orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createWorkOrderSchema.parse(body);

    // Create work order
    const newOrder = await createWorkOrder(validatedData);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating work order:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create work order' },
      { status: 500 }
    );
  }
}
