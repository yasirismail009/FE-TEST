import React from 'react';

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="bg-red-100 text-red-800 px-4 py-3 rounded mb-4 text-center border border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800">
      {message}
    </div>
  );
} 