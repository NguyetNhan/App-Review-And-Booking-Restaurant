import { connect } from 'react-redux';
import { onSearchRestaurantAndClient, onResetProps, onResetPropsMessage } from '../actions';
import Component from '../components';

const mapStateToProps = (state) => {
        const searchReducers = state.SearchReducers.MainReducers;
        if (searchReducers != null) {
                if (searchReducers.searchSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                listRestaurant: searchReducers.searchSucceeded.data.data.restaurant,
                                listClient: searchReducers.searchSucceeded.data.data.client,
                                countItem: searchReducers.searchSucceeded.data.count_item,
                        };
                } else if (searchReducers.searchFailed !== undefined) {
                        return {
                                isLoading: false,
                                message: searchReducers.searchFailed.message
                        };
                } else if (searchReducers.resetProps !== undefined) {
                        return searchReducers.resetProps;
                } else if (searchReducers.resetPropsMessage !== undefined) {
                        return searchReducers.resetPropsMessage;
                }
        } else {
                return {
                        isLoading: false
                };
        }

};
const mapDispatchToProps = (dispatch) => {
        return {
                onSearchRestaurantAndClient: (data) => {
                        dispatch(onSearchRestaurantAndClient(data));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);