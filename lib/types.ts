export type WorkOrderPriority = 'Low' | 'Medium' | 'High';
export type WorkOrderStatus = 'Open' | 'In Progress' | 'Done';

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  updatedAt: string;
  createdAt: string;
}

export interface CreateWorkOrderInput {
  title: string;
  description: string;
  priority: WorkOrderPriority;
}

export interface UpdateWorkOrderInput {
  title?: string;
  description?: string;
  priority?: WorkOrderPriority;
  status?: WorkOrderStatus;
}
