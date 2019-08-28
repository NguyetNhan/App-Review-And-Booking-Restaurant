import { connect } from 'react-redux';
import Component from '../components';
import { onRegisterRestaurant } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        const resultsRegister = state.RegisterRestaurantReducers.RegisterRestaurant;
        if (resultsRegister !== undefined) {
                if (resultsRegister.data.error) {
                        ToastAndroid.show(resultsRegister.data.message, ToastAndroid.LONG);
                        return {
                                modalLoading: false
                        };
                } else {
                        alert(resultsRegister.data.message);
                        return {
                                modalLoading: false,
                                changeScreen: true
                        };
                }
        } else {
                return {
                        modalLoading: false
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onRegisterRestaurant: (data) => {
                        dispatch(onRegisterRestaurant(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



