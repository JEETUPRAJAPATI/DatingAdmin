import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  MessageSquare,
  CreditCard,
  History,
  BrainCircuit,
  Bell,
  UserX,
  UserMinus,
  Tags,
  Palette,
  FileCheck,
  Activity,
  Mail,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Admin Management', href: '/admins', icon: UserCog },
  { name: 'Chat Management', href: '/chats', icon: MessageSquare },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'Payments', href: '/payments', icon: History },
  { name: 'Questions & Quiz', href: '/questions', icon: BrainCircuit },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Reported Users', href: '/reported', icon: UserX },
  { name: 'Banned Users', href: '/banned', icon: UserMinus },
  { name: 'Interests', href: '/interests', icon: Tags },
  { name: 'Theme & Settings', href: '/settings', icon: Palette },
  { name: 'Verifications', href: '/verifications', icon: FileCheck },
  { name: 'Activity Logs', href: '/logs', icon: Activity },
  { name: 'Email Templates', href: '/email-templates', icon: Mail },
  { name: 'Support', href: '/support', icon: HelpCircle },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Dating Admin
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg px-2 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}