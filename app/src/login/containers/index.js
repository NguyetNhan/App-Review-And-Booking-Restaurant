import { connect } from 'react-redux';
import Component from '../components';
import { onLogin, onAddAccountIntoLocal, onResetProps } from '../actions';

const mapStateToProps = (state) => {
        const resultsLogin = state.LoginReducers.Login;
        const resultsAddAccount = state.LoginReducers.AddAccount;
        const resetProps = state.LoginReducers.ResetProps;
        if (resultsLogin !== undefined) {
                if (resultsLogin.data.error) {
                        return {
                                loading: false,
                                messages: resultsLogin.data.message
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
                        return {
                                loading: false,
                                account: resultsAddAccount.data.data,
                                messages: resultsAddAccount.data.message
                        };
                }
        } else if (resetProps !== undefined) {
                return resetProps;
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
                },
                onAddAccountIntoLocal: (data) => {
                        dispatch(onAddAccountIntoLocal(data));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



