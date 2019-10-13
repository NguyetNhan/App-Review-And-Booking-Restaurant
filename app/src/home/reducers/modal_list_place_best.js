import {
        FETCH_PLACE_THE_BEST_FOR_MODAL_FAILED,
        FETCH_PLACE_THE_BEST_FOR_MODAL_SUCCEEDED
} from '../actions/types';

const ModalListPlaceBestReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_PLACE_THE_BEST_FOR_MODAL_SUCCEEDED:
                        return {
                                fetchListPlaceTheBestForModalSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_PLACE_THE_BEST_FOR_MODAL_FAILED:
                        return {
                                fetchListPlaceTheBestForModalFailed: {
                                        message: action.message
                                }
                        };

                default:
                        return state;
        }
};

export default ModalListPlaceBestReducers;