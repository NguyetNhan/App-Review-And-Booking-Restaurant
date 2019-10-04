import { combineReducers } from 'redux';
import Index from './index';
import ItemReviewReducers from './item_review';


const AddReviewReducers = combineReducers({
        Index,
        ItemReviewReducers
});

export default AddReviewReducers;