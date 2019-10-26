import { connect } from 'react-redux';
import {
        onFetchInviteList,
        onResetProps,
        onResetPropsMessage
} from '../actions';
import Component from '../components/main';

const mapStateToProps = (state) => {
        const mainReducers = state.InviteReducers.MainReducers;
        if (mainReducers !== null) {
                if (mainReducers.fetchInviteListSucceeded !== undefined) {
                        return {
                                inviteList: mainReducers.fetchInviteListSucceeded.data,
                                isLoading: false
                        };
                } else if (mainReducers.fetchInviteListFailed !== undefined) {
                        return {
                                message: mainReducers.fetchInviteListFailed.message,
                                isLoading: false
                        };
                } else if (mainReducers.resetProps !== undefined) {
                        return mainReducers.resetProps;
                } else if (mainReducers.resetPropsMessage !== undefined) {
                        return mainReducers.resetPropsMessage;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchInviteList: (idAccount) => {
                        dispatch(onFetchInviteList(idAccount));
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