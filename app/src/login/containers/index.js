import { connect } from 'react-redux';
import Component from '../components';
import { onLogin, onAddAccountIntoLocal } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        const stateNew = state.LoginReducers;
        const resultsLogin = state.LoginReducers.Login;
        const resultsAddAccount = state.LoginReducers.AddAccount;
        if (stateNew !== undefined) {
                if (resultsLogin !== undefined) {
                        if (resultsLogin.data.error) {
                                ToastAndroid.show(resultsLogin.data.message, ToastAndroid.LONG);
                                return {
                                        loading: false
                                };
                        } else {
                                return {
                                        infoUser: resultsLogin.data.data,
                                        loading: true
                                };
                        }
                } else if (resultsAddAccount !== undefined) {
                        if (resultsAddAccount.data.error) {
                                return {
                                        loading: false
                                };
                        } else {
                                ToastAndroid.show(resultsAddAccount.data.message, ToastAndroid.LONG);
                                return {
                                        loading: false,
                                        authorities: resultsAddAccount.data.authorities
                                };
                        }
                } else {
                        return {
                                loading: false
                        };
                }
        } else {
                return {

                };
        }

};
const mapDispatchToProps = (dispatch) => {
        return {
                onLogin: (data) => {
                        dispatch(onLogin(data));
                },
                onAddAccountIntoLocal: (data) => {
                        dispatch(onAddAccountIntoLocal(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



