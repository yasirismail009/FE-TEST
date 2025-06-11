'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

type ToastContextType = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  function showToast(message: string, type: 'success' | 'error' = 'success') {
    if (type === 'error') {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
} 