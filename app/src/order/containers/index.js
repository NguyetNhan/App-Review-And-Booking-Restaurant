import { connect } from 'react-redux';
import Component from '../components';
import {
        onAddOrder,
        onChangePage,
        onResetProps
} from '../actions';

const mapStateToProps = (state) => {
        const addOrderSucceeded = state.OrderReducers.AddOrderSucceeded;
        const addOrderFailed = state.OrderReducers.AddOrderFailed;
        const resetProps = state.OrderReducers.ResetProps;
        if (addOrderSucceeded !== undefined) {
                return {
                        isLoading: false,
                        resultOrder: addOrderSucceeded.data
                };
        } else if (addOrderFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: addOrderFailed.messages
                };
        } else if (resetProps !== undefined) {
                return resetProps;
        }
        else {
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
                onResetProps: () => {
                        dispatch(onResetProps());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

