import { connect } from 'react-redux';
import Component from '../components';
import { onSignup, onResetProps, onResetPropsMessage } from '../actions';

const mapStateToProps = (state) => {
        const signupResults = state.SignupReducers;
        if (signupResults !== null) {
                if (signupResults.signUpSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                message: signupResults.signUpSucceeded.message
                        };
                } else if (signupResults.signUpFailed !== undefined) {
                        return {
                                isLoading: false,
                                message: signupResults.signUpFailed.message
                        };
                } else if (signupResults.resetProps !== undefined) {
                        return signupResults.resetProps;
                } else if (signupResults.resetPropsMessage !== undefined) {
                        return signupResults.resetPropsMessage;
                }
        } else {
                return {
                        isLoading: false,
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onSignup: (data) => {
                        dispatch(onSignup(data));
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



