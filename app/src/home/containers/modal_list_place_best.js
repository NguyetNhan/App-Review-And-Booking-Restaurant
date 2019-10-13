import { connect } from 'react-redux';
import Component from '../components/modal_list_place_best';
import {
        onFetchPlaceTheBestForModal
} from '../actions';
const mapStateToProps = (state) => {
        const modalListPlaceBestReducers = state.HomeReducers.ModalListPlaceBestReducers;
        if (modalListPlaceBestReducers !== null) {
                if (modalListPlaceBestReducers.fetchListPlaceTheBestForModalSucceeded !== undefined) {
                        return {
                                listPlace: modalListPlaceBestReducers.fetchListPlaceTheBestForModalSucceeded.data.data,
                                page: modalListPlaceBestReducers.fetchListPlaceTheBestForModalSucceeded.data.page,
                                total_page: modalListPlaceBestReducers.fetchListPlaceTheBestForModalSucceeded.total_page,
                                isLoading: false
                        };
                } else if (modalListPlaceBestReducers.fetchListPlaceTheBestForModalFailed !== undefined) {
                        return {
                                message: modalListPlaceBestReducers.fetchListPlaceTheBestForModalFailed.message,
                                isLoading: false
                        };
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchPlaceTheBestForModal: (page) => {
                        dispatch(onFetchPlaceTheBestForModal(page));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);