import ProjectManagementPage from '@/features/project';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import OTPVerification from '@features/auth/components/otp-verification';
import { AuthenticationPage } from '@features/auth';
import { RequireAuth } from '@features/auth/components/RequireAuth';
import Board from '@features/board/Board';
import Dashboard from '@features/dashboard';
import DeveloperDock from '@features/dev-dock';
import { LandingPage } from '@features/landingPage';
import MessagePage from '@features/message';
import Account from '@features/setting/component/account-page';
import Appearance from '@features/setting/component/appearance-page';
import Notification from '@features/setting/component/notification-page';
import Profile from '@features/setting/component/profile-page';
import Notfoundpage from './layouts/404-page';
import { AppLayout } from './layouts/app-layout';
import { LandingAuthLayout } from './layouts/landing-auth-layout';
import { SettingLayout } from './layouts/setting-layout';
import { Welcome } from './test/Welcome';
// test
import { UsersList } from './test/users/userList';
// import { FileUpload} from './components/general/file-upload';

// Routing from landing page to its child and sign in paage
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<LandingAuthLayout />}>
            {/* Public routes */}
            <Route index element={<LandingPage />} />
            <Route path="auth" element={<AuthenticationPage />} />

            {/* Authenticated routes */}
            <Route element={<AppLayout />}>
                {/* Welcome and Users */}
                <Route path="welcome" element={<Welcome />} />
                <Route path="users" element={<UsersList />} />

                {/* Settings */}
                <Route path="settings" element={<SettingLayout />}>
                    <Route
                        index
                        element={<Navigate to="edit-profile" replace />}
                    />
                    <Route path="edit-profile" element={<Profile />} />
                    <Route path="account" element={<Account />} />
                    <Route path="appearance" element={<Appearance />} />
                    <Route path="notification" element={<Notification />} />
                </Route>

                {/* Dashboard */}
                <Route path="dashboard" element={<Dashboard />} />

                {/* Project Management */}
                <Route
                    path="notification"
                    element={<ProjectManagementPage />}
                />

                {/* Board */}
                <Route path="board/:id" element={<Board />} />

                {/* Messages */}
                <Route path="inbox" element={<MessagePage />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<Notfoundpage />} />
            </Route>

            {/* Catch-all for unauthenticated 404 */}
            <Route path="*" element={<Notfoundpage />} />
        </Route>
    )
);

const queryClient = new QueryClient()

function App() {
    // Global States
    const currentTheme = useSelector(state => state.currentTheme.value);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />  
    </QueryClientProvider>
  );
}

export default App;
