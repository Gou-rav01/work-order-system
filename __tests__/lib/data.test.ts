import { describe, it, expect, beforeEach } from 'vitest';
import { createWorkOrder, getAllWorkOrders, getWorkOrder, updateWorkOrder, deleteWorkOrder } from '@/lib/data/workOrders';
import type { WorkOrder } from '@/lib/types';

describe('Work Order Data Layer', () => {
  let createdOrderId: string;

  beforeEach(async () => {
    // Clean up and start fresh for each test
  });

  it('should create a work order', async () => {
    const input = {
      title: 'Test Work Order',
      description: 'Test Description',
      priority: 'High' as const,
    };

    const order = await createWorkOrder(input);

    expect(order).toBeDefined();
    expect(order.title).toBe(input.title);
    expect(order.description).toBe(input.description);
    expect(order.priority).toBe(input.priority);
    expect(order.status).toBe('Open');
    expect(order.id).toBeDefined();

    createdOrderId = order.id;
  });

  it('should retrieve all work orders', async () => {
    // Create a few orders first
    await createWorkOrder({
      title: 'Order 1',
      description: 'Desc 1',
      priority: 'Low',
    });

    await createWorkOrder({
      title: 'Order 2',
      description: 'Desc 2',
      priority: 'High',
    });

    const orders = await getAllWorkOrders();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);
  });

  it('should get a specific work order by id', async () => {
    const created = await createWorkOrder({
      title: 'Specific Order',
      description: 'To Find',
      priority: 'Medium',
    });

    const found = await getWorkOrder(created.id);

    expect(found).toBeDefined();
    expect(found?.id).toBe(created.id);
    expect(found?.title).toBe(created.title);
  });

  it('should update a work order', async () => {
    const created = await createWorkOrder({
      title: 'Original Title',
      description: 'Original Desc',
      priority: 'Low',
    });

    const updated = await updateWorkOrder(created.id, {
      title: 'Updated Title',
      status: 'In Progress',
    });

    expect(updated).toBeDefined();
    expect(updated?.title).toBe('Updated Title');
    expect(updated?.status).toBe('In Progress');
    expect(updated?.priority).toBe('Low'); // Should remain unchanged
  });

  it('should delete a work order', async () => {
    const created = await createWorkOrder({
      title: 'To Delete',
      description: 'Temporary',
      priority: 'Low',
    });

    const success = await deleteWorkOrder(created.id);

    expect(success).toBe(true);

    const notFound = await getWorkOrder(created.id);
    expect(notFound).toBeNull();
  });

  it('should return null for non-existent work order', async () => {
    const notFound = await getWorkOrder('non-existent-id');
    expect(notFound).toBeNull();
  });

  it('should return false when deleting non-existent work order', async () => {
    const success = await deleteWorkOrder('non-existent-id');
    expect(success).toBe(false);
  });
});
