import { connect } from 'react-redux';
import { onFetchListOrder, onResetProps } from '../actions';
import Component from '../components';
const mapStateToProps = (state) => {
        const fetchListOrderForAdminSucceeded = state.DealReducers.FetchSucceeded;
        const fetchListOrderForAdminFailed = state.DealReducers.FetchFailed;
        const resetProps = state.DealReducers.ResetProps;
        if (fetchListOrderForAdminSucceeded !== undefined) {
                return {
                        isLoading: false,
                        page: fetchListOrderForAdminSucceeded.data.page,
                        total_page: fetchListOrderForAdminSucceeded.data.total_page,
                        listOrder: fetchListOrderForAdminSucceeded.data.data
                };
        } else if (fetchListOrderForAdminFailed !== undefined) {
                return {
                        isLoading: false,
                        message: fetchListOrderForAdminFailed.messages
                };
        } else if (resetProps !== undefined) {
                return resetProps;
        } else {
                return {
                        isLoading: false,
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListOrder: (data) => {
                        dispatch(onFetchListOrder(data));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                }
        };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
