import { AppSidebar } from '@/components/sidebar/component/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CommandPanel } from '@/features/command-panel/components/command-panel';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
    const [open, setOpen] = React.useState(false);
    const [commandPanelOpen, setCommandPanelOpen] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setCommandPanelOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative h-full">
            <SidebarProvider
                style={{
                    '--sidebar-width': '14rem',
                    '--sidebar-width-mobile': '20rem',
                } as React.CSSProperties}
                open={open}
                onOpenChange={setOpen}
            >
                <AppSidebar open={open} setOpen={setOpen} />
                <Outlet />
            </SidebarProvider>

            {/* Command Panel overlay */}
            {commandPanelOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            setCommandPanelOpen(false);
                        }
                    }}
                >
                    <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
                        <CommandPanel
                            open={commandPanelOpen}
                            setOpen={setCommandPanelOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
