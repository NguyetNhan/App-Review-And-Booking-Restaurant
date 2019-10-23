import { connect } from 'react-redux';
import {
        onFetchNearbyLocationRestaurant,
        onFetchLocationFriend,
        onResetProps,
        onResetPropsMessage
} from '../actions';
import Component from '../components';

const mapStateToProps = (state) => {
        const mapReducers = state.MapReducers;
        if (mapReducers !== null) {
                if (mapReducers.fetchPlaceSucceeded !== undefined) {
                        return {
                                markerList: mapReducers.fetchPlaceSucceeded.data
                        };
                } else if (mapReducers.fetchPlaceFailed !== undefined) {
                        return {
                                messages: mapReducers.fetchPlaceFailed.messages
                        };
                } else if (mapReducers.fetchFriendFailed !== undefined) {
                        return {
                                messages: mapReducers.fetchFriendFailed.messages
                        };
                } else if (mapReducers.fetchFriendSucceeded !== undefined) {
                        return {
                                markerList: mapReducers.fetchFriendSucceeded.data
                        };
                } else if (mapReducers.resetProps !== undefined) {
                        return mapReducers.resetProps;
                } else if (mapReducers.resetPropsMessage !== undefined) {
                        return mapReducers.resetPropsMessage;
                }
        } else {
                return {

                };
        }

};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchNearbyLocationRestaurant: (position) => {
                        dispatch(onFetchNearbyLocationRestaurant(position));
                },
                onFetchLocationFriend: (idAccount) => {
                        dispatch(onFetchLocationFriend(idAccount));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);