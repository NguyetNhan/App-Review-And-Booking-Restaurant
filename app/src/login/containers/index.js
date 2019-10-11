import { connect } from 'react-redux';
import Component from '../components';
import { onLogin, onAddAccountIntoLocal, onResetProps, onResetPropsMessage } from '../actions';

const mapStateToProps = (state) => {
        const resultsLogin = state.LoginReducers;
        if (resultsLogin !== null) {
                if (resultsLogin.loginSucceeded !== undefined) {
                        return {
                                account: resultsLogin.loginSucceeded.data
                        };
                } else if (resultsLogin.loginFailed !== undefined) {
                        return {
                                isLoading: false,
                                messagesLogin: resultsLogin.loginFailed.message
                        };
                } else if (resultsLogin.addAccountLocalSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                messagesAddAccountSucceeded: resultsLogin.addAccountLocalSucceeded.message,
                        };
                } else if (resultsLogin.addAccountLocalFailed !== undefined) {
                        return {
                                isLoading: false,
                                messagesAddAccountFailed: resultsLogin.addAccountLocalFailed.message
                        };
                } else if (resultsLogin.resetProps !== undefined) {
                        return resultsLogin.resetProps;
                } else if (resultsLogin.resetPropsMessage !== undefined) {
                        return resultsLogin.resetPropsMessage;
                }
        } else {
                return {
                        isLoading: false
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
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



