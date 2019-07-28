import { connect } from 'react-redux';
import Component from '../components';
import { onLogin } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        const resultsLogin = state.LoginReducers.Login;
        if (resultsLogin !== undefined) {
                if (resultsLogin.data.error) {
                        ToastAndroid.show(resultsLogin.data.message, ToastAndroid.LONG);
                        return {
                                loading: false
                        };
                } else {
                        ToastAndroid.show(resultsLogin.data.message, ToastAndroid.LONG);
                        return {
                                infoUser: resultsLogin.data.data,
                                loading: false
                        };
                }
        } else {
                return {
                        loading: false
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onLogin: (data) => {
                        dispatch(onLogin(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



