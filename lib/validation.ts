import { z } from 'zod';

export const workOrderPrioritySchema = z.enum(['Low', 'Medium', 'High']);
export const workOrderStatusSchema = z.enum(['Open', 'In Progress', 'Done']);

export const createWorkOrderSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(80, 'Title must be less than 80 characters'),
  description: z.string().max(2000, 'Description must be less than 2000 characters'),
  priority: workOrderPrioritySchema,
});

export const updateWorkOrderSchema = z.object({
  title: z.string().min(2).max(80).optional(),
  description: z.string().max(2000).optional(),
  priority: workOrderPrioritySchema.optional(),
  status: workOrderStatusSchema.optional(),
});

export type CreateWorkOrderSchema = z.infer<typeof createWorkOrderSchema>;
export type UpdateWorkOrderSchema = z.infer<typeof updateWorkOrderSchema>;
