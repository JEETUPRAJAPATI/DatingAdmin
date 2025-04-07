import React, { useState } from 'react';
import { Search, MessageSquare, Flag, Trash2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  senderName: string;
  receiverName: string;
}

const dummyChats: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user1',
    receiverId: 'user2',
    message: 'Hey, how are you?',
    timestamp: '2024-03-10T10:30:00',
    senderName: 'John Doe',
    receiverName: 'Jane Smith',
  },
  // Add more dummy chats
];

export function Chats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Chat Management</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search chats..."
              className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {dummyChats.map((chat) => (
              <button
                key={chat.id}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  selectedChat?.id === chat.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {chat.senderName} → {chat.receiverName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(chat.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {chat.message}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedChat ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Chat between {selectedChat.senderName} and {selectedChat.receiverName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedChat.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="rounded-lg p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                    <Flag className="h-5 w-5" />
                  </button>
                  <button className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedChat.senderName}
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {selectedChat.message}
                  </p>
                </div>
                {/* Add more messages here */}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                Select a chat to view the conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}