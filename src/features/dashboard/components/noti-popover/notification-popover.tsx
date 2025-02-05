import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';
import { useSelector } from 'react-redux';

import { DataFactory } from '../../utils/data-factory';
import { NotificationItem, NotificationItemProps } from './notification-item';

interface NotificationPopoverProps {
    children: React.ReactNode;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
    children,
}) => {
    const dataViewMode = useSelector(
        (state: any) => state.dataViewMode.current
    );
    const [notifications, setNotifications] = React.useState<
        NotificationItemProps[]
    >([]);

    React.useEffect(() => {
        setNotifications(DataFactory.getNotificationData(dataViewMode));
    }, [dataViewMode]);

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="flex w-80 flex-col gap-2 p-0">
                {notifications.map((notification, index) => (
                    <NotificationItem
                        key={index}
                        icon={notification.icon}
                        title={notification.title}
                        description={notification.description}
                        sentAt={notification.sentAt}
                    />
                ))}
            </PopoverContent>
        </Popover>
    );
};
