export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'banned' | 'pending';
  premium: boolean;
  location: {
    city: string;
    state: string;
  };
  age: number;
  gender: string;
  joinedAt: string;
  lastActive: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  avatar: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  active: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'user' | 'system' | 'alert';
  read: boolean;
  createdAt: string;
}