import { combineReducers } from 'redux';
import ListConversationReducers from './list_conversation';
import ItemConversationReducers from './item_conversation';

const ChatReducers = combineReducers({
        ListConversationReducers,
        ItemConversationReducers
});

export default ChatReducers;