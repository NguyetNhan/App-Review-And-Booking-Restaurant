import { FETCH_NOTIFICATION_FAILED, FETCH_NOTIFICATION_SUCCEEDED } from '../actions/action_types';


const NotificationReducers = (state = [], action) => {
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
                default:
                        return state;
        }
};

export default NotificationReducers;