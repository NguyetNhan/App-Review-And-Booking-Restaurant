import { connect } from 'react-redux';
import Component from '../components/item_conversation';
import {
        onFetchInfoAccountReceiver,
        onResetPropsItemConversation,
        onResetPropsMessageItemConversation,
        onFetchNewMessageForItem
} from '../actions';

const mapStateToProps = (state) => {
        const itemConversationReducers = state.ChatReducers.ItemConversationReducers;
        if (itemConversationReducers !== null) {
                if (itemConversationReducers.fetchNewMessageSucceeded !== undefined) {
                        return {
                                tinNhanMoiNhat: itemConversationReducers.fetchNewMessageSucceeded.data,
                        };
                } else if (itemConversationReducers.fetchNewMessageFailed !== undefined) {
                        return {
                                message: itemConversationReducers.fetchNewMessageFailed.message,
                                isLoading: false
                        };
                } else if (itemConversationReducers.fetchInfoAccountReceiverSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                accountReceiver: itemConversationReducers.fetchInfoAccountReceiverSucceeded.data,
                        };
                } else if (itemConversationReducers.fetchInfoAccountReceiverFailed !== undefined) {
                        return {
                                message: itemConversationReducers.fetchInfoAccountReceiverFailed.message,
                                isLoading: false
                        };
                } else if (itemConversationReducers.resetPropsItemConversation !== undefined) {
                        return itemConversationReducers.resetPropsItemConversation;
                } else if (itemConversationReducers.resetPropsMessageItemConversation !== undefined) {
                        return itemConversationReducers.resetPropsMessageItemConversation;
                }
        } else
                return {
                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchInfoAccountReceiver: (idAccount) => {
                        dispatch(onFetchInfoAccountReceiver(idAccount));
                },
                onResetPropsItemConversation: () => {
                        dispatch(onResetPropsItemConversation());
                },
                onResetPropsMessageItemConversation: () => {
                        dispatch(onResetPropsMessageItemConversation());
                },
                onFetchNewMessageForItem: (idConversation) => {
                        dispatch(onFetchNewMessageForItem(idConversation));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);