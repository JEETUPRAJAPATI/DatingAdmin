import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
  );
}

export default App;