import {
        FETCH_DETAIL_RESTAURANT_FAILED,
        FETCH_DETAIL_RESTAURANT_SUCCEEDED,
        FETCH_SCORE_REVIEW_FOR_OVERVIEW_FAILED,
        FETCH_SCORE_REVIEW_FOR_OVERVIEW_SUCCEEDED,
        CHECK_FOLLOW_RESTAURANT_FAILED,
        CHECK_FOLLOW_RESTAURANT_SUCCEEDED,
        FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_FAILED,
        FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_SUCCEEDED,
        RESET_PROPS_MESSAGE_OVERVIEW,
        RESET_PROPS_OVERVIEW
} from '../actions/action_types';

const OverviewReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_DETAIL_RESTAURANT_SUCCEEDED:
                        return {
                                fetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_DETAIL_RESTAURANT_FAILED:
                        return {
                                fetchFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_SCORE_REVIEW_FOR_OVERVIEW_SUCCEEDED:
                        return {
                                fetchScoreReviewSucceeded: {
                                        score: action.score
                                }
                        };
                case FETCH_SCORE_REVIEW_FOR_OVERVIEW_FAILED:
                        return {
                                fetchScoreReviewFailed: {
                                        message: action.message
                                }
                        };
                case CHECK_FOLLOW_RESTAURANT_SUCCEEDED:
                        return {
                                checkFollowSucceeded: {
                                        isCheckedFollow: action.isChecked
                                }
                        };
                case CHECK_FOLLOW_RESTAURANT_FAILED:
                        return {
                                checkFollowFailed: {
                                        message: action.message
                                }
                        };
                case FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_SUCCEEDED:
                        return {
                                followedAndUnFollowedSucceeded: {
                                        isCheckedFollow: action.isChecked
                                }
                        };
                case FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_FAILED:
                        return {
                                followedAndUnFollowedFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_OVERVIEW:
                        return {
                                resetProps: {
                                        message: undefined,
                                        isCheckedFollow: false,
                                        restaurant: undefined,
                                        score: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_OVERVIEW:
                        return {
                                resetPropsMessage: {
                                        message: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default OverviewReducers;