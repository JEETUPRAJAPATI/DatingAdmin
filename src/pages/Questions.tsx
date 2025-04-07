import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter, HandIcon as DragHandleDots2Icon, AlertCircle } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

interface Question {
  id: string;
  question: string;
  type: 'MCQ' | 'YES_NO' | 'TEXT';
  category: string;
  options?: string[];
  required: boolean;
  order: number;
}

interface QuestionFormData {
  question: string;
  type: 'MCQ' | 'YES_NO' | 'TEXT';
  category: string;
  options: string[];
  required: boolean;
}

const initialFormData: QuestionFormData = {
  question: '',
  type: 'MCQ',
  category: 'Preferences',
  options: [],
  required: true,
};

const dummyQuestions: Question[] = [
  {
    id: '1',
    question: 'What are you looking for?',
    type: 'MCQ',
    category: 'Preferences',
    options: ['Relationship', 'Friendship', 'Casual Dating'],
    required: true,
    order: 1,
  },
  {
    id: '2',
    question: 'Do you smoke?',
    type: 'YES_NO',
    category: 'Lifestyle',
    required: true,
    order: 2,
  },
  {
    id: '3',
    question: 'Describe your ideal partner',
    type: 'TEXT',
    category: 'Preferences',
    required: false,
    order: 3,
  },
];

export function Questions() {
  const [questions, setQuestions] = useState(dummyQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState<QuestionFormData>(initialFormData);
  const [newOption, setNewOption] = useState('');
  const [draggedQuestion, setDraggedQuestion] = useState<Question | null>(null);

  const categories = Array.from(new Set(questions.map(q => q.category)));

  const handleOpenModal = (question: Question | null = null) => {
    if (question) {
      setFormData({
        question: question.question,
        type: question.type,
        category: question.category,
        options: question.options || [],
        required: question.required,
      });
      setSelectedQuestion(question);
    } else {
      setFormData(initialFormData);
      setSelectedQuestion(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestion) {
      setQuestions(questions.map(q =>
        q.id === selectedQuestion.id
          ? { ...q, ...formData }
          : q
      ));
    } else {
      const newQuestion = {
        id: String(questions.length + 1),
        ...formData,
        order: questions.length + 1,
      };
      setQuestions([...questions, newQuestion]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedQuestion) {
      setQuestions(questions.filter(q => q.id !== selectedQuestion.id));
      setIsDeleteModalOpen(false);
      setSelectedQuestion(null);
    }
  };

  const addOption = () => {
    if (newOption.trim()) {
      setFormData({
        ...formData,
        options: [...formData.options, newOption.trim()],
      });
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index),
    });
  };

  const handleDragStart = (question: Question) => {
    setDraggedQuestion(question);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetQuestion: Question) => {
    if (!draggedQuestion || draggedQuestion.id === targetQuestion.id) return;

    const reorderedQuestions = questions.map(q => {
      if (q.id === draggedQuestion.id) {
        return { ...q, order: targetQuestion.order };
      }
      if (q.id === targetQuestion.id) {
        return { ...q, order: draggedQuestion.order };
      }
      return q;
    });

    setQuestions(reorderedQuestions.sort((a, b) => a.order - b.order));
    setDraggedQuestion(null);
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;
    const matchesType = typeFilter === 'all' || question.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Questions & Quiz</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your questionnaire and matching criteria</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
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
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="MCQ">Multiple Choice</option>
          <option value="YES_NO">Yes/No</option>
          <option value="TEXT">Text</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            draggable
            onDragStart={() => handleDragStart(question)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(question)}
            className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-0 transition-opacity group-hover:opacity-100">
              <DragHandleDots2Icon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-start justify-between pl-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  {question.required && (
                    <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      <AlertCircle className="h-3 w-3" />
                      Required
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {question.type}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {question.category}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenModal(question)}
                  className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedQuestion(question);
                    setIsDeleteModalOpen(true);
                  }}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {question.type === 'MCQ' && question.options && (
              <div className="mt-4 pl-6">
                <p className="mb-2 text-sm font-medium text-gray-500">Options:</p>
                <div className="flex flex-wrap gap-2">
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedQuestion ? 'Edit Question' : 'Add New Question'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Question
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'MCQ' | 'YES_NO' | 'TEXT' })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="MCQ">Multiple Choice</option>
              <option value="YES_NO">Yes/No</option>
              <option value="TEXT">Text</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          {formData.type === 'MCQ' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Options
              </label>
              <div className="mt-2 space-y-2">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[index] = e.target.value;
                        setFormData({ ...formData, options: newOptions });
                      }}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add new option"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addOption();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addOption}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="required"
              checked={formData.required}
              onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="required" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Required
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
              {selectedQuestion ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Question"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this question? This action cannot be undone.
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