import { FETCH_LIST_CONFIRM_RESTAURANT_RESULTS } from '../actions/action_types';

const AdminConfirmRestaurantReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIST_CONFIRM_RESTAURANT_RESULTS:
                        return {
                                FetchRestaurant: {
                                        data: action.data
                                }
                        };
                default:
                        return state;
        }
};

export default AdminConfirmRestaurantReducers;