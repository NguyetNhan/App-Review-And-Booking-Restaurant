import { connect } from 'react-redux';
import Component from '../components/item_place';
import {
        onFetchStarPlaceForItemSuggestion
} from '../actions';
const mapStateToProps = (state) => {
        const itemPlaceReducers = state.HomeReducers.ItemPlaceReducers;
        if (itemPlaceReducers !== null) {
                if (itemPlaceReducers.fetchStarSucceeded !== undefined) {
                        return {
                                score: itemPlaceReducers.fetchStarSucceeded.data,
                                isLoading: false
                        };
                } else if (itemPlaceReducers.fetchStarFailed !== undefined) {
                        return {
                                message: itemPlaceReducers.fetchStarFailed.message,
                                isLoading: false
                        };
                }
        }
        return {

        };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchStarPlaceForItemSuggestion: (idPlace) => {
                        dispatch(onFetchStarPlaceForItemSuggestion(idPlace));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);