import { combineReducers } from 'redux';
import MainReducers from './main';
import HeaderReducers from './header';
import PostListReducers from './post_list';
import ItemPostListReducers from './item_post_list';
const PersonReducers = combineReducers({
        MainReducers,
        HeaderReducers,
        PostListReducers,
        ItemPostListReducers
});

export default PersonReducers;