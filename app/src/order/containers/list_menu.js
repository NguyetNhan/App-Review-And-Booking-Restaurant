import { connect } from 'react-redux';
import Component from '../components/list_menu';
import {
        onFetchListMenu,
        onResetPropsListMenu
} from '../actions';

const mapStateToProps = (state) => {
        const orderReducers = state.OrderReducers;
        if (orderReducers !== null) {
                if (orderReducers.fetchMenuSucceeded !== undefined) {
                        var list = [];
                        for (item of orderReducers.fetchMenuSucceeded.data.data) {
                                item.isSelected = false;
                                item.amount = '1';
                                list.push(item);
                        }
                        return {
                                isLoading: false,
                                listMenu: list,
                                page: orderReducers.fetchMenuSucceeded.data.page,
                                total_page: orderReducers.fetchMenuSucceeded.data.total_page,
                        };
                } else if (orderReducers.fetchMenuFailed !== undefined) {
                        return {
                                isLoading: false,
                                messages: orderReducers.fetchMenuFailed.messages
                        };
                } else if (orderReducers.status !== undefined) {
                        return {
                                changePage: orderReducers.status,
                                isLoading: false,
                        };
                } else if (orderReducers.resetPropsMenu !== undefined) {
                        return orderReducers.resetPropsMenu;
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
                onFetchListMenu: (data) => {
                        dispatch(onFetchListMenu(data));
                },
                onResetPropsListMenu: () => {
                        dispatch(onResetPropsListMenu());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

