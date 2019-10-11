import { connect } from 'react-redux';
import Component from '../components';
import {
        onAddOrder,
        onChangePage,
        onResetPropsMain,
        onResetPropsMessage
} from '../actions';

const mapStateToProps = (state) => {
        const orderReducers = state.OrderReducers;
        if (orderReducers !== null) {
                if (orderReducers.addOrderSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                messagesSucceeded: orderReducers.addOrderSucceeded.messages,
                        };
                } else if (orderReducers.addOrderFailed !== undefined) {
                        return {
                                isLoading: false,
                                messagesFailed: orderReducers.addOrderFailed.messages
                        };
                } else if (orderReducers.resetProps !== undefined) {
                        return orderReducers.resetProps;
                } else if (orderReducers.resetPropsMessage !== undefined) {
                        return orderReducers.resetPropsMessage;
                } else {
                        return {
                        };
                }
        } else {
                return {
                        isLoading: false
                };
        }
};

const mapDispatchToProps = (dispatch) => {
        return {
                onAddOrder: (data) => {
                        dispatch(onAddOrder(data));
                },
                onChangePage: (status) => {
                        dispatch(onChangePage(status));
                },
                onResetPropsMain: () => {
                        dispatch(onResetPropsMain());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

