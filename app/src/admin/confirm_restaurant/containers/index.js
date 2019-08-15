import { connect } from 'react-redux';
import Component from '../components';
import { onFetchListConfirmRestaurant } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        const listRestaurant = state.AdminConfirmRestaurantReducers.FetchRestaurant;
        if (listRestaurant !== undefined) {
                if (listRestaurant.data.error) {
                        ToastAndroid.show(listRestaurant.data.message, ToastAndroid.LONG);
                        return {
                                isLoading: false
                        };
                } else {
                        if (listRestaurant.data.data !== null) {
                                ToastAndroid.show(listRestaurant.data.message, ToastAndroid.LONG);
                                return {
                                        listData: listRestaurant.data.data,
                                        isLoading: false,
                                        data: true
                                };
                        } else {
                                ToastAndroid.show(listRestaurant.data.message, ToastAndroid.LONG);
                                return {
                                        isLoading: false,
                                        listData: [],
                                        data: false
                                };
                        }
                }
        } else {
                return {
                        isLoading: false,
                };
        }



};
const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListConfirmRestaurant: () => {
                        dispatch(onFetchListConfirmRestaurant());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



