import Swal, { SweetAlertIcon } from 'sweetalert2';

export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}

interface NotificationOptions {
    title?: string;
    timer?: number;
}

/**
 * @description - handles the notification pop-up throughout the entire project
 * @param message - handles the custom message 
 * @param type - dictates what type of notification it is
 * @param options - extra info to style the notification.
 */
export const showNotification = (
    message: string,
    type: NotificationType = NotificationType.INFO,
    options: NotificationOptions = {}
) => {
    const {
        title,
        timer = 2000
    } = options;

    const configMap: Record<NotificationType, { background: string; color: string; icon: SweetAlertIcon }> = {
        [NotificationType.SUCCESS]: {
            background: '#4CAF50',
            color: '#fff',
            icon: 'success'
        },
        [NotificationType.ERROR]: {
            background: '#FC703B',
            color: '#fff',
            icon: 'error'
        },
        [NotificationType.INFO]: {
            background: '#2196F3',
            color: '#fff',
            icon: 'info'
        },
        [NotificationType.WARNING]: {
            background: '#FF9800',
            color: '#fff',
            icon: 'warning'
        }
    };

    const config = configMap[type];

    Swal.fire({
        text: message,
        title: title || '',
        icon: config.icon,
        iconColor: "#fff",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer,
        background: config.background,
        color: config.color
    });
};