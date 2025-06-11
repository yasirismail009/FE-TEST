import React from 'react';

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 00-4 4v2a4 4 0 008 0v-2a4 4 0 00-4-4z" /></svg>
      <span className="text-lg">{message}</span>
    </div>
  );
} 