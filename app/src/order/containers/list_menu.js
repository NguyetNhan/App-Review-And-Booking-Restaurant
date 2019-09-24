import { connect } from 'react-redux';
import Component from '../components/list_menu';
import {
        onFetchListMenu,
} from '../actions';

const mapStateToProps = (state) => {
        const fetchMenuSucceeded = state.OrderReducers.FetchMenuSucceeded;
        const fetchMenuFailed = state.OrderReducers.FetchMenuFailed;
        const onChangePage = state.OrderReducers.status;
        if (fetchMenuSucceeded !== undefined) {
                var list = [];
                for (item of fetchMenuSucceeded.data.data) {
                        item.isSelected = false;
                        item.amount = '1';
                        list.push(item);
                }
                return {
                        isLoading: false,
                        listMenu: list,
                        page: fetchMenuSucceeded.data.page,
                        total_page: fetchMenuSucceeded.data.total_page,
                };
        } else if (fetchMenuFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchMenuFailed.messages
                };
        } else if (onChangePage !== undefined) {
                return {
                        changePage: onChangePage,
                        isLoading: false,
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
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

