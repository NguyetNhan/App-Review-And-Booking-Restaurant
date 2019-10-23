import { connect } from 'react-redux';
import Component from '../components';
import {
        onFetchStrangerList,
        onResetMessageProps,
        onResetProps
} from '../actions';

const mapStateToProps = (state) => {
        const strangerReducers = state.StrangerReducers;
        if (strangerReducers !== null) {
                if (strangerReducers.fetchStrangerListSucceeded !== undefined) {
                        console.log('strangerReducers.fetchStrangerListSucceeded: ', strangerReducers.fetchStrangerListSucceeded);
                        return {
                                strangerList: strangerReducers.fetchStrangerListSucceeded.data,
                                isLoading: false
                        };
                } else if (strangerReducers.fetchStrangerListFailed !== undefined) {
                        return {
                                isLoading: false,
                                message: strangerReducers.fetchStrangerListFailed.message
                        };
                } else if (strangerReducers.resetProps !== undefined) {
                        return strangerReducers.resetProps;
                } else if (strangerReducers.resetPropsMessage !== undefined) {
                        return strangerReducers.resetPropsMessage;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchStrangerList: (idAccount, geolocation) => {
                        dispatch(onFetchStrangerList(idAccount, geolocation));
                },
                onResetMessageProps: () => {
                        dispatch(onResetMessageProps());
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);