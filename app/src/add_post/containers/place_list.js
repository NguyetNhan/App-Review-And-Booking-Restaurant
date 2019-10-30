import { connect } from 'react-redux';
import {
        onFetchPlaceListHasArrived,
        onResetPropsPlaceList,
        onResetPropsMessagePlaceList
} from '../actions';
import Component from '../components/place_list';

const mapStateToProps = (state) => {
        const placeListReducers = state.AddPostReducers.PlaceListReducers;
        if (placeListReducers !== null) {
                if (placeListReducers.fetchPlaceListSucceeded !== undefined) {
                        return {
                                placeList: placeListReducers.fetchPlaceListSucceeded.data,
                                isLoading: false
                        };
                } else if (placeListReducers.fetchPlaceListFailed !== undefined) {
                        return {
                                message: placeListReducers.fetchPlaceListFailed.message,
                                isLoading: false
                        };
                } else if (placeListReducers.resetProps !== undefined) {
                        return placeListReducers.resetProps;
                } else if (placeListReducers.resetPropsMessage !== undefined) {
                        return placeListReducers.resetPropsMessage;
                }
        }
        return {

        };

};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchPlaceListHasArrived: (idAccount) => {
                        dispatch(onFetchPlaceListHasArrived(idAccount));
                },
                onResetPropsPlaceList: () => {
                        dispatch(onResetPropsPlaceList());
                },
                onResetPropsMessagePlaceList: () => {
                        dispatch(onResetPropsMessagePlaceList());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);