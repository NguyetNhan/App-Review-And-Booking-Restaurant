import { connect } from 'react-redux';
import Component from '../components';
import {
        onFetchDetailRestaurant,
        onFetchScoreReview,
        onFollowedAndUnFollowedRestaurant,
        onCheckFollowRestaurant,
        onResetProps,
        onResetPropsMessage
} from '../actions';

const mapStateToProps = (state) => {
        const overviewReducers = state.OverviewReducers;
        if (overviewReducers !== null) {
                if (overviewReducers.fetchSucceeded !== undefined) {
                        return {
                                restaurant: overviewReducers.fetchSucceeded.data
                        };
                } else if (overviewReducers.fetchFailed !== undefined) {
                        return {
                                message: overviewReducers.fetchFailed.message
                        };
                } else if (overviewReducers.fetchScoreReviewSucceeded !== undefined) {
                        return {
                                score: overviewReducers.fetchScoreReviewSucceeded.score
                        };
                } else if (overviewReducers.fetchScoreReviewFailed !== undefined) {
                        return {
                                message: overviewReducers.fetchScoreReviewFailed.message
                        };
                } else if (overviewReducers.checkFollowSucceeded !== undefined) {
                        return {
                                isCheckedFollow: overviewReducers.checkFollowSucceeded.isCheckedFollow
                        };
                } else if (overviewReducers.checkFollowFailed !== undefined) {
                        return {
                                message: overviewReducers.checkFollowFailed.message
                        };
                }
                else if (overviewReducers.followedAndUnFollowedSucceeded !== undefined) {
                        return {
                                isCheckedFollow: overviewReducers.followedAndUnFollowedSucceeded.isCheckedFollow
                        };
                } else if (overviewReducers.followedAndUnFollowedFailed !== undefined) {
                        return {
                                message: overviewReducers.followedAndUnFollowedFailed.message
                        };
                } else if (overviewReducers.resetProps !== undefined) {
                        return overviewReducers.resetProps;
                } else if (overviewReducers.resetPropsMessage !== undefined) {
                        return overviewReducers.resetPropsMessage;
                }

        } else
                return {

                };
};
const mapDispatchToProps = (dispatch) => {
        return {
                onFetchDetailRestaurant: (data) => {
                        dispatch(onFetchDetailRestaurant(data));
                },
                onFetchScoreReview: (data) => {
                        dispatch(onFetchScoreReview(data));
                },
                onFollowedAndUnFollowedRestaurant: (idRestaurant, idClient) => {
                        dispatch(onFollowedAndUnFollowedRestaurant(idRestaurant, idClient));
                },
                onCheckFollowRestaurant: (idRestaurant, idClient) => {
                        dispatch(onCheckFollowRestaurant(idRestaurant, idClient));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
