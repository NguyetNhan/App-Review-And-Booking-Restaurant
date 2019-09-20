import { connect } from 'react-redux';
import { onFetchListOrder, onResetProps } from '../actions';
import Component from '../components';
const mapStateToProps = (state) => {
        const fetchListOrderSucceeded = state.DealReducers.FetchSucceeded;
        const fetchListOrderFailed = state.DealReducers.FetchFailed;
        const resetProps = state.DealReducers.ResetProps;
        if (fetchListOrderSucceeded !== undefined) {
                return {
                        isLoading: false,
                        page: fetchListOrderSucceeded.data.page,
                        total_page: fetchListOrderSucceeded.data.total_page,
                        listOrder: fetchListOrderSucceeded.data.data
                };
        } else if (fetchListOrderFailed !== undefined) {
                return {
                        isLoading: false,
                        message: fetchListOrderFailed.messages
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
