import { FETCH_NOTIFICATION, FETCH_NOTIFICATION_FAILED, FETCH_NOTIFICATION_SUCCEEDED, RESET_PROPS_NOTIFICATION } from './action_types';

export const onFetchNotification = (data) => {
        return {
                type: FETCH_NOTIFICATION,
                data
        };
};

export const onFetchNotificationSucceeded = (data) => {
        return {
                type: FETCH_NOTIFICATION_SUCCEEDED,
                data
        };
};

export const onFetchNotificationFailed = (messages) => {
        return {
                type: FETCH_NOTIFICATION_FAILED,
                messages
        };
};
export const onResetProps = () => {
        return {
                type: RESET_PROPS_NOTIFICATION,
        };
};