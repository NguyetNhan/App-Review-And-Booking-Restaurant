import { connect } from 'react-redux';
import Component from '../components';
import { onSignup } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        const signupResults = state.SignupReducers.Signup;
        if (signupResults !== undefined) {
                if (signupResults.data.error) {
                        ToastAndroid.show(signupResults.data.message, ToastAndroid.LONG);
                        return {
                                loading: false
                        };
                } else {
                        ToastAndroid.show(signupResults.data.message, ToastAndroid.LONG);
                        return {
                                loading: false,
                                infoUser: signupResults.data.data
                        };
                }
        } else {
                return {
                        loading: false,
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onSignup: (data) => {
                        dispatch(onSignup(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



