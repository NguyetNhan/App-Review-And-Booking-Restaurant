import { connect } from 'react-redux';
import Component from '../components/modal_list_food_best';
import {
        onFetchFoodTheBestForModal
} from '../actions';
const mapStateToProps = (state) => {
        const modalListFoodBestReducers = state.HomeReducers.ModalListFoodBestReducers;
        if (modalListFoodBestReducers !== null) {
                if (modalListFoodBestReducers.fetchListFoodTheBestForModalSucceeded !== undefined) {
                        return {
                                listFood: modalListFoodBestReducers.fetchListFoodTheBestForModalSucceeded.data.data,
                                page: modalListFoodBestReducers.fetchListFoodTheBestForModalSucceeded.data.page,
                                total_page: modalListFoodBestReducers.fetchListFoodTheBestForModalSucceeded.total_page,
                                isLoading: false
                        };
                } else if (modalListFoodBestReducers.fetchListFoodTheBestForModalFailed !== undefined) {
                        return {
                                message: modalListFoodBestReducers.fetchListFoodTheBestForModalFailed.message,
                                isLoading: false
                        };
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchFoodTheBestForModal: (page) => {
                        dispatch(onFetchFoodTheBestForModal(page));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);