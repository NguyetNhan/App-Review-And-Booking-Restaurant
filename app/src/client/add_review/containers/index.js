import { connect } from 'react-redux';
import Component from '../components';
import {
} from '../actions';

const mapStateToProps = (state) => {
        /* else if (confirmReducers.addReviewSucceeded !== undefined) {
               return {
                       isLoading: false,
                       messageSucceeded: confirmReducers.addReviewSucceeded.message,
               };
       
       } else if (confirmReducers.addReviewFailed !== undefined) {
               return {
                       isLoading: false,
                       messageFailed: confirmReducers.addReviewFailed.message,
               };
       } */
        return {

        };
};

const mapDispatchToProps = (dispatch) => {
        return {
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);