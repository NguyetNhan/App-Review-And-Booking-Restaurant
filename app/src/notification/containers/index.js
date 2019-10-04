import { connect } from 'react-redux';
import Component from '../components';
import { onFetchNotification, onResetProps } from '../actions';

const mapStateToProps = (state) => {
        const notificationReducers = state.NotificationReducers;
        if (notificationReducers !== null) {
                if (notificationReducers.FetchSucceeded !== undefined) {
                        return {
                                listNotification: notificationReducers.FetchSucceeded.data.data,
                                isLoading: false,
                                page: notificationReducers.FetchSucceeded.data.page,
                                total_page: notificationReducers.FetchSucceeded.data.total_page
                        };
                } else if (notificationReducers.FetchFailed !== undefined) {
                        return {
                                messages: notificationReducers.FetchFailed.messages,
                                isLoading: false
                        };
                } else if (notificationReducers.resetProps !== undefined) {
                        return notificationReducers.resetProps;
                }
        } else {
                return {
                        isLoading: false
                };
        }



};
const mapDispatchToProps = (dispatch) => {
        return {
                onFetchNotification: (data) => {
                        dispatch(onFetchNotification(data));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



