import connectDB from '../mongodb';
import WorkOrderModel from '@/models/WorkOrder';

import type {
  WorkOrder,
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
} from '../types';

function format(doc: any): WorkOrder {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    priority: doc.priority,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

// Get all work orders
export async function getAllWorkOrders(): Promise<WorkOrder[]> {
  await connectDB();

  const orders = await WorkOrderModel.find().sort({
    createdAt: -1,
  });

  return orders.map(format);
}

// Get single work order
export async function getWorkOrder(id: string): Promise<WorkOrder | null> {
  await connectDB();

  const order = await WorkOrderModel.findById(id);

  if (!order) return null;

  return format(order);
}

// Create work order
export async function createWorkOrder(
  input: CreateWorkOrderInput
): Promise<WorkOrder> {
  await connectDB();

  const order = await WorkOrderModel.create({
    ...input,
    status: 'Open',
  });

  return format(order);
}

// Update work order
export async function updateWorkOrder(
  id: string,
  input: UpdateWorkOrderInput
): Promise<WorkOrder | null> {
  await connectDB();

  const order = await WorkOrderModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!order) return null;

  return format(order);
}

// Delete work order
export async function deleteWorkOrder(id: string): Promise<boolean> {
  await connectDB();

  const result = await WorkOrderModel.findByIdAndDelete(id);

  return !!result;
}