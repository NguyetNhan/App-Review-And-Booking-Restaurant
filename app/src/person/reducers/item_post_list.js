import {
        RESET_PROPS_ITEM_POST_LIST,
        RESET_PROPS_MESSAGE_ITEM_POST_LIST,
        CHECK_HAS_LIKE_POST_FOR_PERSON_FAILED,
        CHECK_HAS_LIKE_POST_FOR_PERSON_SUCCEEDED,
        LIKE_POST_FOR_PERSON
} from '../actions/types';


const ItemPostListReducers = (state = null, action) => {
        switch (action.type) {
                case CHECK_HAS_LIKE_POST_FOR_PERSON_SUCCEEDED:
                        return {
                                checkLikeSucceeded: {
                                        data: action.data
                                }
                        };
                case CHECK_HAS_LIKE_POST_FOR_PERSON_FAILED:
                        return {
                                checkLikeFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_ITEM_POST_LIST:
                        return {
                                resetProps: {
                                        message: undefined,
                                        isLiked: false
                                }
                        };
                case RESET_PROPS_MESSAGE_ITEM_POST_LIST:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                case LIKE_POST_FOR_PERSON:
                        return {
                                likePost: {
                                        isLiked: !action.isLiked
                                }
                        };
                default:
                        return state;
        }
};

export default ItemPostListReducers;