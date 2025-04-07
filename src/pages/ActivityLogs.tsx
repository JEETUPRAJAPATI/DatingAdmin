import React, { useState } from 'react';
import { Search, Filter, Activity, User, Settings, Shield, Download } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  category: 'user' | 'system' | 'security' | 'admin';
  details: string;
  ipAddress: string;
  timestamp: string;
}

const dummyLogs: ActivityLog[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Smith',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    action: 'Profile Update',
    category: 'user',
    details: 'Updated profile information including bio and preferences',
    ipAddress: '192.168.1.1',
    timestamp: '2024-03-10T10:30:00',
  },
  {
    id: '2',
    userId: 'admin1',
    userName: 'Admin User',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    action: 'User Ban',
    category: 'admin',
    details: 'Banned user for violating community guidelines',
    ipAddress: '192.168.1.2',
    timestamp: '2024-03-10T09:15:00',
  },
  {
    id: '3',
    userId: 'system',
    userName: 'System',
    userAvatar: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=100&h=100&fit=crop',
    action: 'Maintenance',
    category: 'system',
    details: 'Scheduled system maintenance completed',
    ipAddress: 'internal',
    timestamp: '2024-03-09T22:00:00',
  },
];

export function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState('24h');

  const filteredLogs = dummyLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user':
        return <User className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'admin':
        return <Activity className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Activity Logs</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <Download className="h-4 w-4" />
          Export Logs
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search logs..."
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="system">System</option>
          <option value="security">Security</option>
        </select>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start gap-4">
              <img
                src={log.userAvatar}
                alt={log.userName}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{log.userName}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{log.ipAddress}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{formatDate(log.timestamp)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    log.category === 'user' ? 'bg-blue-100 text-blue-800' :
                    log.category === 'admin' ? 'bg-purple-100 text-purple-800' :
                    log.category === 'system' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {getCategoryIcon(log.category)}
                    {log.action}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{log.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredLogs.length} logs
        </div>
        <div className="flex space-x-2">
          <button className="rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            Previous
          </button>
          <button className="rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}