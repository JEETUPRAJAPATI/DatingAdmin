import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  documentType: 'ID' | 'Passport' | 'License';
  documentImage: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

const dummyRequests: VerificationRequest[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Smith',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    documentType: 'ID',
    documentImage: 'https://images.unsplash.com/photo-1608037521244-f1c6c7635194?w=800&h=600&fit=crop',
    status: 'pending',
    submittedAt: '2024-03-10T10:30:00',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Emily Brown',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    documentType: 'Passport',
    documentImage: 'https://images.unsplash.com/photo-1608037521244-f1c6c7635194?w=800&h=600&fit=crop',
    status: 'approved',
    submittedAt: '2024-03-09T15:45:00',
    reviewedAt: '2024-03-09T16:30:00',
    reviewedBy: 'Admin User',
    notes: 'Documents verified successfully',
  },
];

export function Verification() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredRequests = dummyRequests.filter(request => {
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.documentType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Verification Requests</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name..."
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="ID">ID Card</option>
          <option value="Passport">Passport</option>
          <option value="License">Driver's License</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={request.userAvatar}
                  alt={request.userName}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{request.userName}</h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {request.status === 'approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {request.status === 'rejected' && <XCircle className="mr-1 h-3 w-3" />}
                      {request.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Document Type: {request.documentType}
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: {formatDate(request.submittedAt)}
                  </p>
                  {request.reviewedAt && (
                    <p className="text-sm text-gray-500">
                      Reviewed: {formatDate(request.reviewedAt)} by {request.reviewedBy}
                    </p>
                  )}
                  {request.notes && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Notes: {request.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Eye className="h-4 w-4" />
                </button>
                {request.status === 'pending' && (
                  <>
                    <button className="rounded-lg p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredRequests.length} requests
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