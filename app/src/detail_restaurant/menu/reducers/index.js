import {
        ADD_MENU_FAILED,
        ADD_MENU_SUCCEEDED,
        FETCH_MENU_FAILED,
        FETCH_MENU_SUCCEEDED,
        RESET_PROPS_MENU,
        RESET_PROPS_MESSAGE_MENU
} from '../actions/action_types';

const MenuReducers = (state = null, action) => {
        switch (action.type) {
                case ADD_MENU_SUCCEEDED:
                        return {
                                AddSucceeded: {
                                        message: action.message
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
                case RESET_PROPS_MENU:
                        return {
                                resetProps: {
                                        message: undefined,
                                        isLoading: false,
                                        listMenu: undefined,
                                        page: undefined,
                                        total_page: undefined,
                                }
                        };
                case RESET_PROPS_MESSAGE_MENU:
                        return {
                                resetPropsMessage: {
                                        message: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default MenuReducers;