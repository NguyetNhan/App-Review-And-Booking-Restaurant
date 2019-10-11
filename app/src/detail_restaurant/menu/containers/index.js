import { connect } from 'react-redux';
import Component from '../components';
import { onAddMenu, onFetchMenu, onResetProps, onResetPropsMessage } from '../actions';

const mapStateToProps = (state) => {
        const menuReducers = state.MenuReducers;
        if (menuReducers !== null) {
                if (menuReducers.AddSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                messages: menuReducers.AddSucceeded.message
                        };
                } else if (menuReducers.AddFailed !== undefined) {
                        return {
                                isLoading: false,
                                messages: menuReducers.AddFailed.message
                        };
                } else if (menuReducers.FetchSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                listMenu: menuReducers.FetchSucceeded.data.data,
                                page: menuReducers.FetchSucceeded.data.page,
                                total_page: menuReducers.FetchSucceeded.data.total_page,
                        };
                } else if (menuReducers.FetchFailed !== undefined) {
                        return {
                                isLoading: false,
                                messages: menuReducers.FetchFailed.message
                        };
                } else if (menuReducers.resetProps !== undefined) {
                        return menuReducers.resetProps;
                } else if (menuReducers.resetPropsMessage !== undefined) {
                        return menuReducers.resetPropsMessage;
                }
        } else {
                return {
                        isLoading: false
                };
        }


};

const mapDispatchToProps = (dispatch) => {
        return {
                onAddMenu: (data) => {
                        dispatch(onAddMenu(data));
                },
                onFetchMenu: (data) => {
                        dispatch(onFetchMenu(data));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                }
        };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
