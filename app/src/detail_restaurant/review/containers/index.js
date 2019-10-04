import { connect } from 'react-redux';
import {
        onResetProps,
        onFetchListReview,
        onResetPropsMessage
} from '../actions';
import Component from '../components';

const mapStateToProps = (state) => {
        const reviewReducers = state.ReviewReducers;
        if (reviewReducers !== null) {
                if (reviewReducers.resetProps !== undefined) {
                        return reviewReducers.resetProps;
                } else if (reviewReducers.fetchListReviewSucceeded !== undefined) {
                        return {
                                listReview: reviewReducers.fetchListReviewSucceeded.data.data,
                                refreshing: false,
                                page: reviewReducers.fetchListReviewSucceeded.data.page,
                                total_page: reviewReducers.fetchListReviewSucceeded.data.total_page
                        };
                } else if (reviewReducers.fetchListReviewFailed !== undefined) {
                        return {
                                refreshing: false,
                                messageFailed: reviewReducers.fetchListReviewFailed.message,
                        };
                }
        } else
                return {
                        refreshing: false
                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListReview: (data) => {
                        dispatch(onFetchListReview(data));
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
