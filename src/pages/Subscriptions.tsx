import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Check, X, CreditCard, Crown, Users, Zap, Shield, Star } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import type { Subscription } from '../types';

interface SubscriptionFormData {
  name: string;
  price: number;
  duration: number;
  features: string[];
  active: boolean;
  highlight?: boolean;
}

const initialFormData: SubscriptionFormData = {
  name: '',
  price: 0,
  duration: 30,
  features: [],
  active: true,
  highlight: false,
};

const dummySubscriptions: (Subscription & { highlight?: boolean })[] = [
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
    highlight: false,
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
    highlight: true,
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
    highlight: false,
  },
];

const featureIcons = {
  'Unlimited Likes': Users,
  'See Who Likes You': Crown,
  'Advanced Filters': Shield,
  'Priority Support': Zap,
  'Boost Profile': Star,
};

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(dummySubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<(typeof dummySubscriptions)[0] | null>(null);
  const [formData, setFormData] = useState<SubscriptionFormData>(initialFormData);
  const [newFeature, setNewFeature] = useState('');

  const handleOpenModal = (subscription: (typeof dummySubscriptions)[0] | null = null) => {
    if (subscription) {
      setFormData({
        name: subscription.name,
        price: subscription.price,
        duration: subscription.duration,
        features: [...subscription.features],
        active: subscription.active,
        highlight: subscription.highlight,
      });
      setSelectedSubscription(subscription);
    } else {
      setFormData(initialFormData);
      setSelectedSubscription(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubscription) {
      setSubscriptions(subscriptions.map(subscription =>
        subscription.id === selectedSubscription.id
          ? { ...subscription, ...formData }
          : subscription
      ));
    } else {
      const newSubscription = {
        id: String(subscriptions.length + 1),
        ...formData,
      };
      setSubscriptions([...subscriptions, newSubscription]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedSubscription) {
      setSubscriptions(subscriptions.filter(subscription => subscription.id !== selectedSubscription.id));
      setIsDeleteModalOpen(false);
      setSelectedSubscription(null);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showActive === null || subscription.active === showActive;
    return matchesSearch && matchesStatus;
  });

  const getFeatureIcon = (feature: string) => {
    const IconComponent = featureIcons[feature as keyof typeof featureIcons];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : <Check className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Subscription Plans</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your subscription plans and pricing</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
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
            className={`relative rounded-xl border-2 bg-white p-6 transition-all hover:shadow-lg dark:bg-gray-800 ${
              subscription.highlight
                ? 'border-blue-500 shadow-blue-100 dark:shadow-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {subscription.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{subscription.name}</h3>
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
              <div className="mt-4 flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-blue-500" />
                <span className="text-3xl font-bold text-blue-600">
                  ${subscription.price}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  /{subscription.duration} days
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  {getFeatureIcon(feature)}
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => handleOpenModal(subscription)}
                className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedSubscription(subscription);
                  setIsDeleteModalOpen(true);
                }}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSubscription ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Plan Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price ($)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Duration (days)
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Features
            </label>
            <div className="mt-2 space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.features];
                      newFeatures[index] = e.target.value;
                      setFormData({ ...formData, features: newFeatures });
                    }}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add new feature"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Highlight as Popular</span>
            </label>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {selectedSubscription ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Subscription Plan"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this subscription plan? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}