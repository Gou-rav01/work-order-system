'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const toastStore: {
  listeners: Set<(toasts: Toast[]) => void>;
  toasts: Toast[];
  show: (message: string, type: ToastType) => void;
  subscribe: (listener: (toasts: Toast[]) => void) => () => void;
} = {
  listeners: new Set(),
  toasts: [],
  show(message: string, type: ToastType) {
    const id = Math.random().toString(36);
    const toast = { id, message, type };
    this.toasts.push(toast);
    this.listeners.forEach(listener => listener([...this.toasts]));

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.listeners.forEach(listener => listener([...this.toasts]));
    }, 3000);
  },
  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
};

export function useToast() {
  return {
    success: (message: string) => toastStore.show(message, 'success'),
    error: (message: string) => toastStore.show(message, 'error'),
  };
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
