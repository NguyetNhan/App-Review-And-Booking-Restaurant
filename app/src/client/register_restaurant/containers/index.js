import { connect } from 'react-redux';
import Component from '../components';
import { onRegisterRestaurant, onResetProps } from '../actions';

const mapStateToProps = (state) => {
        const resultsRegister = state.RegisterRestaurantReducers;
        if (resultsRegister !== null) {
                if (resultsRegister.registerSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                message: resultsRegister.registerSucceeded.message,
                        };
                } else if (resultsRegister.registerFailed !== undefined) {
                        return {
                                isLoading: false,
                                message: resultsRegister.registerFailed.message,
                        };
                } else if (resultsRegister.resetProps !== undefined) {
                        return resultsRegister.resetProps;
                }
        } else {
                return {
                        isLoading: false
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onRegisterRestaurant: (data) => {
                        dispatch(onRegisterRestaurant(data));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



