import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Mail, Copy, Eye } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'welcome' | 'verification' | 'notification' | 'marketing' | 'system';
  description: string;
  lastModified: string;
  active: boolean;
  variables: string[];
}

const dummyTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to Our Dating App!',
    type: 'welcome',
    description: 'Sent to new users after registration',
    lastModified: '2024-03-10T10:30:00',
    active: true,
    variables: ['user_name', 'verification_link'],
  },
  {
    id: '2',
    name: 'Email Verification',
    subject: 'Verify Your Email Address',
    type: 'verification',
    description: 'Email verification request',
    lastModified: '2024-03-09T15:45:00',
    active: true,
    variables: ['user_name', 'verification_code'],
  },
  {
    id: '3',
    name: 'Match Notification',
    subject: 'You Have a New Match!',
    type: 'notification',
    description: 'Sent when users match with each other',
    lastModified: '2024-03-08T09:15:00',
    active: true,
    variables: ['user_name', 'match_name', 'match_profile_link'],
  },
];

export function EmailTemplates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  const filteredTemplates = dummyTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Email Templates</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          New Template
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search templates..."
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="welcome">Welcome</option>
          <option value="verification">Verification</option>
          <option value="notification">Notification</option>
          <option value="marketing">Marketing</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{template.subject}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                template.type === 'welcome' ? 'bg-green-100 text-green-800' :
                template.type === 'verification' ? 'bg-blue-100 text-blue-800' :
                template.type === 'notification' ? 'bg-purple-100 text-purple-800' :
                template.type === 'marketing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {template.type}
              </span>
              {template.active && (
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {template.description}
            </p>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Variables:</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {template.variables.map((variable, index) => (
                  <code
                    key={index}
                    className="rounded bg-gray-100 px-2 py-1 text-xs font-mono text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {`{{${variable}}}`}
                  </code>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Last modified: {new Date(template.lastModified).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}