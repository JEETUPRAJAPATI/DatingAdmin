import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Tag, Heart, Music, Camera, Gamepad, Book, Utensils, Plane } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

interface Interest {
  id: string;
  name: string;
  category: string;
  usageCount: number;
  active: boolean;
  icon: keyof typeof categoryIcons;
  color: string;
}

const categoryIcons = {
  'Hobbies': Heart,
  'Music': Music,
  'Photography': Camera,
  'Gaming': Gamepad,
  'Reading': Book,
  'Food': Utensils,
  'Travel': Plane,
};

interface InterestFormData {
  name: string;
  category: string;
  active: boolean;
  icon: keyof typeof categoryIcons;
  color: string;
}

const initialFormData: InterestFormData = {
  name: '',
  category: 'Hobbies',
  active: true,
  icon: 'Hobbies',
  color: '#3B82F6',
};

const dummyInterests: Interest[] = [
  {
    id: '1',
    name: 'Photography',
    category: 'Photography',
    usageCount: 1250,
    active: true,
    icon: 'Photography',
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Hiking',
    category: 'Hobbies',
    usageCount: 980,
    active: true,
    icon: 'Hobbies',
    color: '#EF4444',
  },
  {
    id: '3',
    name: 'Cooking',
    category: 'Food',
    usageCount: 1500,
    active: true,
    icon: 'Food',
    color: '#10B981',
  },
  {
    id: '4',
    name: 'Gaming',
    category: 'Gaming',
    usageCount: 2100,
    active: true,
    icon: 'Gaming',
    color: '#8B5CF6',
  },
];

export function Interests() {
  const [interests, setInterests] = useState(dummyInterests);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);
  const [formData, setFormData] = useState<InterestFormData>(initialFormData);

  const categories = Array.from(new Set(interests.map(interest => interest.category)));

  const handleOpenModal = (interest: Interest | null = null) => {
    if (interest) {
      setFormData({
        name: interest.name,
        category: interest.category,
        active: interest.active,
        icon: interest.icon,
        color: interest.color,
      });
      setSelectedInterest(interest);
    } else {
      setFormData(initialFormData);
      setSelectedInterest(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterest) {
      setInterests(interests.map(interest =>
        interest.id === selectedInterest.id
          ? { ...interest, ...formData }
          : interest
      ));
    } else {
      const newInterest = {
        id: String(interests.length + 1),
        ...formData,
        usageCount: 0,
      };
      setInterests([...interests, newInterest]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedInterest) {
      setInterests(interests.filter(interest => interest.id !== selectedInterest.id));
      setIsDeleteModalOpen(false);
      setSelectedInterest(null);
    }
  };

  const filteredInterests = interests.filter(interest => {
    const matchesSearch = interest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || interest.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Interest Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage user interests and categories</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add Interest
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search interests..."
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
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInterests.map((interest) => {
          const IconComponent = categoryIcons[interest.icon];
          return (
            <div
              key={interest.id}
              className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              style={{ borderLeftColor: interest.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg p-2"
                      style={{ backgroundColor: `${interest.color}20` }}
                    >
                      <IconComponent
                        className="h-5 w-5"
                        style={{ color: interest.color }}
                      />
                    </div>
                    <h3 className="text-lg font-medium">{interest.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${interest.color}20`,
                        color: interest.color,
                      }}
                    >
                      {interest.category}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {interest.usageCount} users
                    </span>
                    {interest.active && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Active
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleOpenModal(interest)}
                    className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedInterest(interest);
                      setIsDeleteModalOpen(true);
                    }}
                    className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedInterest ? 'Edit Interest' : 'Add New Interest'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                const category = e.target.value as keyof typeof categoryIcons;
                setFormData({
                  ...formData,
                  category,
                  icon: category,
                });
              }}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            >
              {Object.keys(categoryIcons).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="mt-1 h-10 w-full rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Active
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
              {selectedInterest ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Interest"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this interest? This action cannot be undone.
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