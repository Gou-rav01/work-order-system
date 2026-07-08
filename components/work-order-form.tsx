'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './toast';
import type { WorkOrder, WorkOrderPriority } from '@/lib/types';

interface WorkOrderFormProps {
  initialData?: WorkOrder;
  isEditing?: boolean;
}

export function WorkOrderForm({ initialData, isEditing = false }: WorkOrderFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: (initialData?.priority || 'Medium') as WorkOrderPriority,
    status: initialData?.status || 'Open',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const url = isEditing
        ? `/api/work-orders/${initialData?.id}`
        : '/api/work-orders';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 400 && errorData.details) {
          // Handle validation errors
          const errorMap: Record<string, string> = {};
          errorData.details.forEach((err: any) => {
            const field = err.path[0];
            errorMap[field] = err.message;
          });
          setErrors(errorMap);
          return;
        }
        throw new Error(errorData.error || 'Failed to save work order');
      }

      const result = await res.json();
      success(isEditing ? 'Work order updated successfully' : 'Work order created successfully');

      // Redirect to detail page
      router.push(`/work-orders/${result.id}`);
    } catch (err: any) {
      error(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter work order title"
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
          minLength={2}
          maxLength={80}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        <p className="text-xs text-muted-foreground mt-1">
          {formData.title.length}/80 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed information about the work order"
          rows={6}
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          maxLength={2000}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        <p className="text-xs text-muted-foreground mt-1">
          {formData.description.length}/2000 characters
        </p>
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Status (only show on edit) */}
      {isEditing && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update Order' : 'Create Order'}
        </button>
      </div>
    </form>
  );
}
