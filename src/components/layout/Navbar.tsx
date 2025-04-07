import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-10 rounded-lg border border-gray-200 pl-10 pr-4 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Admin</span>
        </button>
      </div>
    </div>
  );
}