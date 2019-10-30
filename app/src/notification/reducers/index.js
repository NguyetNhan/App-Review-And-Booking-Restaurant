import { FETCH_NOTIFICATION_FAILED, FETCH_NOTIFICATION_SUCCEEDED, RESET_PROPS_NOTIFICATION } from '../actions/action_types';


const NotificationReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_NOTIFICATION_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_NOTIFICATION_FAILED:
                        return {
                                FetchFailed: {
                                        messages: action.messages
                                }
                        };
                case RESET_PROPS_NOTIFICATION:
                        return {
                                resetProps: {
                                        messages: undefined,
                                        listNotification: undefined,
                                        isLoading: true
                                }
                        };
                default:
                        return state;
        }
};

export default NotificationReducers;