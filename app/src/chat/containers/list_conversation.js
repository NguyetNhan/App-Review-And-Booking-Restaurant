import { connect } from 'react-redux';
import Component from '../components/list_conversation';
import {
        onFetchListConversation,
        onResetPropsListConversation,
        onResetPropsMessageListConversation,
} from '../actions';

const mapStateToProps = (state) => {
        const listConversationReducers = state.ChatReducers.ListConversationReducers;
        if (listConversationReducers !== null) {
                if (listConversationReducers.fetchListConversationSucceeded !== undefined) {
                        return {
                                listConversation: listConversationReducers.fetchListConversationSucceeded.data.data,
                                page: listConversationReducers.fetchListConversationSucceeded.data.page,
                                total_page: listConversationReducers.fetchListConversationSucceeded.data.total_page,
                                isLoading: false
                        };
                } else if (listConversationReducers.fetchListConversationFailed !== undefined) {
                        return {
                                messageFailed: listConversationReducers.fetchListConversationFailed.message,
                                isLoading: false
                        };
                } else if (listConversationReducers.resetPropsListConversation !== undefined) {
                        return listConversationReducers.resetPropsListConversation;
                } else if (listConversationReducers.resetPropsMessageListConversation !== undefined) {
                        return listConversationReducers.resetPropsMessageListConversation;
                }
        } else {
                return {
                        isLoading: false
                };
        }

};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListConversation: (idAccount, page) => {
                        dispatch(onFetchListConversation(idAccount, page));
                },
                onResetPropsListConversation: () => {
                        dispatch(onResetPropsListConversation());
                },
                onResetPropsMessageListConversation: () => {
                        dispatch(onResetPropsMessageListConversation());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);