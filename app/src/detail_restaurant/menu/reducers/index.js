import { ADD_MENU_FAILED, ADD_MENU_SUCCEEDED, FETCH_MENU_FAILED, FETCH_MENU_SUCCEEDED } from '../actions/action_types';

const MenuReducers = (state = [], action) => {
        switch (action.type) {
                case ADD_MENU_SUCCEEDED:
                        return {
                                AddSucceeded: {
                                        data: action.data
                                }
                        };
                case ADD_MENU_FAILED:
                        return {
                                AddFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_MENU_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_MENU_FAILED:
                        return {
                                FetchFailed: {
                                        message: action.message
                                }
                        };
                default:
                        return state;
        }
};

export default MenuReducers;