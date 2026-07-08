import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { WorkOrder, CreateWorkOrderInput, UpdateWorkOrderInput } from '../types';

const DATA_DIR = path.join(process.cwd(), 'data');
const WORK_ORDERS_FILE = path.join(DATA_DIR, 'work-orders.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
}

// Read all work orders
async function readWorkOrders(): Promise<WorkOrder[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(WORK_ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write work orders to file
async function writeWorkOrders(orders: WorkOrder[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(WORK_ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// Get all work orders
export async function getAllWorkOrders(): Promise<WorkOrder[]> {
  return readWorkOrders();
}

// Get single work order
export async function getWorkOrder(id: string): Promise<WorkOrder | null> {
  const orders = await readWorkOrders();
  return orders.find(order => order.id === id) || null;
}

// Create work order
export async function createWorkOrder(input: CreateWorkOrderInput): Promise<WorkOrder> {
  const orders = await readWorkOrders();
  const now = new Date().toISOString();

  const newOrder: WorkOrder = {
    id: uuidv4(),
    ...input,
    status: 'Open',
    createdAt: now,
    updatedAt: now,
  };

  orders.push(newOrder);
  await writeWorkOrders(orders);

  return newOrder;
}

// Update work order
export async function updateWorkOrder(id: string, input: UpdateWorkOrderInput): Promise<WorkOrder | null> {
  const orders = await readWorkOrders();
  const index = orders.findIndex(order => order.id === id);

  if (index === -1) {
    return null;
  }

  const now = new Date().toISOString();
  orders[index] = {
    ...orders[index],
    ...input,
    updatedAt: now,
  };

  await writeWorkOrders(orders);
  return orders[index];
}

// Delete work order
export async function deleteWorkOrder(id: string): Promise<boolean> {
  const orders = await readWorkOrders();
  const index = orders.findIndex(order => order.id === id);

  if (index === -1) {
    return false;
  }

  orders.splice(index, 1);
  await writeWorkOrders(orders);
  return true;
}
