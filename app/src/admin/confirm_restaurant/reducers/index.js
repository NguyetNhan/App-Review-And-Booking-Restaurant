import { FETCH_LIST_CONFIRM_RESTAURANT_RESULTS, CONFIRM_AGREE_RESULTS, CONFIRM_CANCEL_RESULTS } from '../actions/action_types';

const AdminConfirmRestaurantReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIST_CONFIRM_RESTAURANT_RESULTS:
                        return {
                                FetchRestaurant: {
                                        data: action.data
                                }
                        };
                case CONFIRM_AGREE_RESULTS: {
                        return {
                                ConfirmAgree: {
                                        data: action.data
                                }
                        };
                }
                case CONFIRM_CANCEL_RESULTS: {
                        return {
                                ConfirmCancel: {
                                        data: action.data
                                }
                        };
                }
                default:
                        return state;
        }
};

export default AdminConfirmRestaurantReducers;