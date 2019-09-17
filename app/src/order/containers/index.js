import { connect } from 'react-redux';
import Component from '../components';
import {
        onFetchListMenu,
        onAddOrder
} from '../actions';

const mapStateToProps = (state) => {
        const fetchMenuSucceeded = state.OrderReducers.FetchMenuSucceeded;
        const fetchMenuFailed = state.OrderReducers.FetchMenuFailed;
        const addOrderSucceeded = state.OrderReducers.AddOrderSucceeded;
        const addOrderFailed = state.OrderReducers.AddOrderFailed;
        if (fetchMenuSucceeded !== undefined) {
                return {
                        isLoading: false,
                        listMenu: fetchMenuSucceeded.data
                };
        } else if (fetchMenuFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchMenuFailed.messages
                };
        } else if (addOrderSucceeded !== undefined) {
                return {
                        isLoading: false,
                        resultOrder: addOrderSucceeded.data
                };
        } else if (addOrderFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: addOrderFailed.messages
                };
        }
        else {
                return {
                        isLoading: false
                };
        }
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListMenu: (data) => {
                        dispatch(onFetchListMenu(data));
                },
                onAddOrder: (data) => {
                        dispatch(onAddOrder(data));
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

