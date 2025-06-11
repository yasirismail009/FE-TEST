import React from 'react';
import {Folder, Bell, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col items-center py-4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg">
        <Button variant="ghost" size="icon" className="mb-4 mt-2">
          <Briefcase className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Button>
        <Button variant="ghost" size="icon" className="mb-4">
          <Folder className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Button>
        <Button variant="ghost" size="icon" className="mb-4 mt-auto">
          <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-20 flex items-center justify-between px-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">FE Test</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-700 dark:text-gray-200">Explore</span>
          </div>
          <div className="flex items-center gap-6">
          
            <Button variant="ghost" size="icon">
              <Bell className="w-8 h-8 text-gray-700 dark:text-gray-200" />
            </Button>
            <span className="text-gray-700 dark:text-gray-200 text-sm">M Yasir Ismail</span>
            <ThemeToggle />
    
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 p-6">
        
          {children}
        </main>
      </div>
    </div>
  );
} 