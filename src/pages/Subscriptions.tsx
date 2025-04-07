import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import type { Subscription } from '../types';

const dummySubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Premium Monthly',
    price: 9.99,
    duration: 30,
    features: [
      'Unlimited Likes',
      'See Who Likes You',
      'Advanced Filters',
      'Priority Support',
      'Boost Profile',
    ],
    active: true,
  },
  {
    id: '2',
    name: 'Premium Yearly',
    price: 99.99,
    duration: 365,
    features: [
      'All Monthly Features',
      '2 Free Boosts/month',
      'Profile Verification Badge',
      'Ad-free Experience',
      'Exclusive Events Access',
    ],
    active: true,
  },
  {
    id: '3',
    name: 'Basic',
    price: 4.99,
    duration: 30,
    features: [
      'Extended Likes',
      'Basic Filters',
      'Standard Support',
    ],
    active: false,
  },
];

export function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState<boolean | null>(null);

  const filteredSubscriptions = dummySubscriptions.filter(subscription => {
    const matchesSearch = subscription.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showActive === null || subscription.active === showActive;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Subscription Plans</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          Add New Plan
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search plans..."
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={showActive === null ? 'all' : showActive ? 'active' : 'inactive'}
          onChange={(e) => {
            if (e.target.value === 'all') setShowActive(null);
            else setShowActive(e.target.value === 'active');
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{subscription.name}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  ${subscription.price}
                  <span className="text-sm text-gray-500">
                    /{subscription.duration} days
                  </span>
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  subscription.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {subscription.active ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <X className="mr-1 h-3 w-3" />
                )}
                {subscription.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <ul className="mb-6 space-y-2">
              {subscription.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex justify-end space-x-2">
              <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <Edit className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}