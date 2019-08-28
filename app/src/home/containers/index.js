import { connect } from 'react-redux';
import Component from '../components';
import { onFetchListRestaurant } from '../actions';

const mapStateToProps = (state) => {
        const fetchListRestaurantSucceeded = state.HomeReducers.FetchListRestaurantSucceeded;
        const fetchListRestaurantFailed = state.HomeReducers.FetchListRestaurantFailed;
        if (fetchListRestaurantSucceeded !== undefined) {
                return {
                        isLoading: false,
                        listRestaurant: fetchListRestaurantSucceeded.data.data,
                        page: fetchListRestaurantSucceeded.data.page,
                        total_page: fetchListRestaurantSucceeded.data.total_page
                };
        } else if (fetchListRestaurantFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchListRestaurantFailed.messages
                };
        } else {
                return {
                        isLoading: false
                };
        }

};
const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListRestaurant: (data) => {
                        dispatch(onFetchListRestaurant(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



