import React from 'react';
import ProjectManagementPage from '@/features/project';
import { AuthenticationPage } from '@features/auth';
import Board from '@features/board/Board';
import Dashboard from '@features/dashboard';
import { LandingPage } from '@features/landingPage';
import MessagePage from '@features/message';
import AccountSettingPage from '@features/setting/component/account-settings/account-page';
import NotificationSettingPage from '@features/setting/component/notification-settings/notification-page';
import ProfileSettingPage from '@features/setting/component/profile-settings/profile-page';
import AppearanceSettingPage from '@features/setting/component/theme-settings/appearance-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

import { ConfirmPage } from '@features/auth/components/confirm-page';
import Notfoundpage from '@layouts/404-page';
import { AppLayout } from '@layouts/app-layout';
import { LandingAuthLayout } from '@layouts/landing-auth-layout';
import { SettingLayout } from '@layouts/setting-layout';

// Routing from landing page to its child and sign in paage
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<LandingAuthLayout />}>
            {/* Public routes */}
            <Route index element={<LandingPage />} />
            <Route path="auth" element={<AuthenticationPage />} />
            <Route path="/auth/confirm" element={<ConfirmPage />} />

            {/* Authenticated routes */}
            <Route element={<AppLayout />}>
                {/* Settings */}
                <Route path="settings" element={<SettingLayout />}>
                    <Route
                        index
                        element={<Navigate to="edit-profile" replace />}
                    />
                    <Route
                        path="edit-profile"
                        element={<ProfileSettingPage />}
                    />
                    <Route path="account" element={<AccountSettingPage />} />
                    <Route
                        path="appearance"
                        element={<AppearanceSettingPage />}
                    />
                    <Route
                        path="notification"
                        element={<NotificationSettingPage />}
                    />
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
    ),
    { future: { v7_relativeSplatPath: true } }
);

const queryClient = new QueryClient();

function App() {
    // Global States
    const currentTheme = useSelector((state: any) => state.currentTheme.value);

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
