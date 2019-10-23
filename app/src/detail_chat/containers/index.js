import { connect } from 'react-redux';
import Component from '../components';
import {
        onCheckConversationExist,
        onFetchInfoAccountReceiver,
        onResetPropsMain,
        onResetPropsMessageMain
} from '../actions';

const mapStateToProps = (state) => {
        const mainReducers = state.DetailChatReducers.MainReducers;
        if (mainReducers !== null) {
                if (mainReducers.checkSucceeded !== undefined) {
                        return {
                                idConversation: mainReducers.checkSucceeded.data,
                                isLoadingIdConversation: false
                        };
                } else if (mainReducers.checkFailed !== undefined) {
                        return {
                                message: mainReducers.checkFailed.message,
                                isLoadingIdConversation: false
                        };
                } else if (mainReducers.fetchInfoAccountReceiverSucceeded !== undefined) {
                        return {
                                accountReceiver: mainReducers.fetchInfoAccountReceiverSucceeded.data.data,
                                isLoadingAccountReceiver: false
                        };
                } else if (mainReducers.fetchInfoAccountReceiverFailed !== undefined) {
                        return {
                                message: mainReducers.fetchInfoAccountReceiverFailed.message,
                                isLoadingAccountReceiver: false
                        };
                } else if (mainReducers.resetPropsMain !== undefined) {
                        return mainReducers.resetPropsMain;
                } else if (mainReducers.resetPropsMessageMain !== undefined) {
                        return mainReducers.resetPropsMessageMain;
                }
        } else
                return {
                        isLoading: true
                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchInfoAccountReceiver: (idAccount) => {
                        dispatch(onFetchInfoAccountReceiver(idAccount));
                },
                onResetPropsMain: () => {
                        dispatch(onResetPropsMain());
                },
                onResetPropsMessageMain: () => {
                        dispatch(onResetPropsMessageMain());
                },
                onCheckConversationExist: (idSend, idReceiver) => {
                        dispatch(onCheckConversationExist(idSend, idReceiver));
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);