import { combineReducers } from 'redux';
import ListMessageReducers from './list_message';
import MainReducers from './main';

const DetailChatReducers = combineReducers({
        ListMessageReducers,
        MainReducers
});

export default DetailChatReducers;