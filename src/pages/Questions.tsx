import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'MCQ' | 'YES_NO' | 'TEXT';
  category: string;
  options?: string[];
  required: boolean;
}

const dummyQuestions: Question[] = [
  {
    id: '1',
    question: 'What are you looking for?',
    type: 'MCQ',
    category: 'Preferences',
    options: ['Relationship', 'Friendship', 'Casual Dating'],
    required: true,
  },
  {
    id: '2',
    question: 'Do you smoke?',
    type: 'YES_NO',
    category: 'Lifestyle',
    required: true,
  },
  {
    id: '3',
    question: 'Describe your ideal partner',
    type: 'TEXT',
    category: 'Preferences',
    required: false,
  },
];

export function Questions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredQuestions = dummyQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Questions & Quiz</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          Add Question
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search questions..."
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
          <option value="Preferences">Preferences</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Background">Background</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{question.question}</h3>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {question.type}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {question.category}
                  </span>
                  {question.required && (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {question.options && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Options:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {question.options.map((option, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}