import { connect } from 'react-redux';
import {
        onSearchWithType,
        onResetPropsMessageModal,
        onResetPropsModal
} from '../actions';
import Component from '../components/modal_list_search';

const mapStateToProps = (state) => {
        const searchReducers = state.SearchReducers.ModalListSearchReducers;
        if (searchReducers !== null) {
                if (searchReducers.searchSucceeded) {
                        return {
                                count_item: searchReducers.searchSucceeded.data.count_item,
                                listSearch: searchReducers.searchSucceeded.data.data,
                                page: searchReducers.searchSucceeded.data.page,
                                total_page: searchReducers.searchSucceeded.data.total_page,
                                isLoading: false
                        };
                } else if (searchReducers.searchFailed) {
                        return {
                                message: searchReducers.searchFailed.message,
                                isLoading: false
                        };
                } else if (searchReducers.resetProps !== undefined) {
                        return searchReducers.resetProps;
                } else if (searchReducers.resetPropsMessage !== undefined) {
                        return searchReducers.resetPropsMessage;
                }
        } else
                return {
                        isLoading: false
                };
};
const mapDispatchToProps = (dispatch) => {
        return {
                onSearchWithType: (option, contentSearch, page) => {
                        dispatch(onSearchWithType(option, contentSearch, page));
                },
                onResetPropsMessageModal: () => {
                        dispatch(onResetPropsMessageModal());
                },
                onResetPropsModal: () => {
                        dispatch(onResetPropsModal());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);