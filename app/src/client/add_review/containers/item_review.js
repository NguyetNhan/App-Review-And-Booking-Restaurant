import { connect } from 'react-redux';
import Component from '../components/item_review';
import {
        onAddReviewRestaurant,
        onResetPropsMessage,
        onCheckHasReview,
        onFetchDetailData
} from '../actions';

const mapStateToProps = (state) => {
        //     console.log('state: ', state.AddReviewReducers.ItemReviewReducers);

        return {

        };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onAddReviewRestaurant: (data) => {
                        dispatch(onAddReviewRestaurant(data));
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                },
                onCheckHasReview: (idReviewReceiver, idAccountReview) => {
                        dispatch(onCheckHasReview(idReviewReceiver, idAccountReview));
                },
                onFetchDetailData: (kind, id) => {
                        dispatch(onFetchDetailData(kind, id));
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);