import {

        FETCH_FOOD_THE_BEST_FOR_MODAL_FAILED,
        FETCH_FOOD_THE_BEST_FOR_MODAL_SUCCEEDED
} from '../actions/types';

const ModalListFoodBestReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_FOOD_THE_BEST_FOR_MODAL_SUCCEEDED:
                        return {
                                fetchListFoodTheBestForModalSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_FOOD_THE_BEST_FOR_MODAL_FAILED:
                        return {
                                fetchListFoodTheBestForModalFailed: {
                                        message: action.message
                                }
                        };

                default:
                        return state;
        }
};

export default ModalListFoodBestReducers;