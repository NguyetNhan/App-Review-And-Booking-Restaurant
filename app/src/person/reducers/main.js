import {
        FETCH_ACCOUNT_VIEW_FAILED,
        FETCH_ACCOUNT_VIEW_SUCCEEDED,
        RESET_PROPS_MAIN_PERSON,
        RESET_PROPS_MESSAGE_MAIN_PERSON
} from '../actions/types';

const MainReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_ACCOUNT_VIEW_SUCCEEDED:
                        return {
                                fetchAccountViewSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_ACCOUNT_VIEW_FAILED:
                        return {
                                fetchAccountViewFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_MAIN_PERSON:
                        return {
                                resetPropsMain: {
                                        isLoading: true,
                                        account: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_MAIN_PERSON:
                        return {
                                resetPropsMessageMain: {
                                        message: undefined
                                }
                        };

                default:
                        return state;
        }
};

export default MainReducers;