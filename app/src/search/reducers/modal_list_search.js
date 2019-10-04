import {
        RESET_PROPS_MESSAGE_SEARCH_MODAL,
        RESET_PROPS_SEARCH_MODAL,
        SEARCH_WITH_TYPE_FAILED,
        SEARCH_WITH_TYPE_SUCCEEDED
} from '../actions/action_types';

const ModalListSearchReducers = (state = null, action) => {
        switch (action.type) {
                case SEARCH_WITH_TYPE_SUCCEEDED:
                        return {
                                searchSucceeded: {
                                        data: action.data
                                }
                        };
                case SEARCH_WITH_TYPE_FAILED:
                        return {
                                searchFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_SEARCH_MODAL:
                        return {
                                resetProps: {
                                        count_item: undefined,
                                        listSearch: undefined,
                                        page: undefined,
                                        total_page: undefined,
                                        isLoading: false
                                }
                        };
                case RESET_PROPS_MESSAGE_SEARCH_MODAL:
                        return {
                                resetPropsMessage: {
                                        messages: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default ModalListSearchReducers;