import { connect } from 'react-redux';
import Component from '../components/list_message';
import {
        onFetchListMessage,
        onResetPropsListMessage,
        onResetPropsMessageListMessage,
        onReceiverMessage
} from '../actions';

const mapStateToProps = (state) => {
        const listMessageReducers = state.DetailChatReducers.ListMessageReducers;
        if (listMessageReducers !== null) {
                if (listMessageReducers.fetchSucceeded !== undefined) {
                        return {
                                listMessage: listMessageReducers.fetchSucceeded.data.data,
                                page: listMessageReducers.fetchSucceeded.data.page,
                                total_page: listMessageReducers.fetchSucceeded.data.total_page,
                                isLoading: false
                        };
                } else if (listMessageReducers.fetchFailed !== undefined) {
                        return {
                                message: listMessageReducers.fetchFailed.message,
                                isLoading: false
                        };
                } else if (listMessageReducers.resetPropsListMessage !== undefined) {
                        return listMessageReducers.resetPropsListMessage;
                } else if (listMessageReducers.resetPropsMessageListMessage !== undefined) {
                        return listMessageReducers.resetPropsMessageListMessage;
                } else if (listMessageReducers.messageReceiver !== undefined) {
                        return {
                                listMessage: listMessageReducers.messageReceiver,
                                isLoading: false,
                                resetListMessage: true,
                        };
                }


        } else
                return {
                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListMessage: (idConversation, page) => {
                        dispatch(onFetchListMessage(idConversation, page));
                },
                onReceiverMessage: (messageReceiver) => {
                        dispatch(onReceiverMessage(messageReceiver));
                },
                onResetPropsListMessage: () => {
                        dispatch(onResetPropsListMessage());
                },
                onResetPropsMessageListMessage: () => {
                        dispatch(onResetPropsMessageListMessage());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);