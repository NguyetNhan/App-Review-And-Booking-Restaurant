import { connect } from 'react-redux';
import Component from '../components';
import { onFetchNotification } from '../actions';

const mapStateToProps = (state) => {
        const fetchSucceeded = state.NotificationReducers.FetchSucceeded;
        const fetchFailed = state.NotificationReducers.FetchFailed;
        if (fetchSucceeded !== undefined) {
                return {
                        listNotification: fetchSucceeded.data.data,
                        isLoading: false,
                        page: fetchSucceeded.data.page,
                        total_page: fetchSucceeded.data.total_page
                };
        } else if (fetchFailed !== undefined) {
                return {
                        messages: fetchFailed.messages,
                        isLoading: false
                };
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
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



