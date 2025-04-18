import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Admins } from './pages/Admins';
import { Chats } from './pages/Chats';
import { Subscriptions } from './pages/Subscriptions';
import { Payments } from './pages/Payments';
import { Questions } from './pages/Questions';
import { Notifications } from './pages/Notifications';
import { Reports } from './pages/Reports';
import { BannedUsers } from './pages/BannedUsers';
import { Interests } from './pages/Interests';
import { IntroScreens } from './pages/IntroScreens';
import { Settings } from './pages/Settings';
import { Verification } from './pages/Verification';
import { ActivityLogs } from './pages/ActivityLogs';
import { EmailTemplates } from './pages/EmailTemplates';
import { Support } from './pages/Support';
import { Profile } from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Main Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="admins" element={<Admins />} />
            <Route path="chats" element={<Chats />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="payments" element={<Payments />} />
            <Route path="questions" element={<Questions />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reported" element={<Reports />} />
            <Route path="banned" element={<BannedUsers />} />
            <Route path="interests" element={<Interests />} />
            <Route path="intro-screens" element={<IntroScreens />} />
            <Route path="settings" element={<Settings />} />
            <Route path="verifications" element={<Verification />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;