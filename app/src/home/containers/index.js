import { connect } from 'react-redux';
import Component from '../components';
import { onFetchListRestaurant, onFetchListCoffee, onFetchNearbyLocationRestaurant } from '../actions';

const mapStateToProps = (state) => {
        const fetchListRestaurantSucceeded = state.HomeReducers.FetchListRestaurantSucceeded;
        const fetchListRestaurantFailed = state.HomeReducers.FetchListRestaurantFailed;
        const fetchListCoffeeSucceeded = state.HomeReducers.FetchListCoffeeSucceeded;
        const fetchListCoffeeFailed = state.HomeReducers.FetchListCoffeeFailed;
        const fetchListRestaurantFollowLocationSucceeded = state.HomeReducers.FetchListRestaurantFollowLocationSucceeded;
        const fetchListRestaurantFollowLocationFailed = state.HomeReducers.FetchListRestaurantFollowLocationFailed;
        if (fetchListRestaurantFollowLocationSucceeded !== undefined) {
                return {
                        isLoading: false,
                        listRestaurantFollowLocation: fetchListRestaurantFollowLocationSucceeded.data
                };
        } else if (fetchListRestaurantFollowLocationFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchListRestaurantFollowLocationFailed.messages
                };
        } else if (fetchListRestaurantSucceeded !== undefined) {
                return {
                        isLoading: false,
                        listRestaurant: fetchListRestaurantSucceeded.data.data,
                };
        } else if (fetchListRestaurantFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchListRestaurantFailed.messages
                };
        } else if (fetchListCoffeeSucceeded !== undefined) {
                return {
                        isLoading: false,
                        listCoffee: fetchListCoffeeSucceeded.data.data,
                };
        } else if (fetchListCoffeeFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchListCoffeeFailed.messages
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
                onFetchListRestaurant: (data) => {
                        dispatch(onFetchListRestaurant(data));
                },
                onFetchListCoffee: (data) => {
                        dispatch(onFetchListCoffee(data));
                },
                onFetchNearbyLocationRestaurant: (position) => {
                        dispatch(onFetchNearbyLocationRestaurant(position));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



