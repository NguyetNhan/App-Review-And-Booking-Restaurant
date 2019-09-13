import { connect } from 'react-redux';
import { onFetchNearbyLocationRestaurant } from '../actions';
import Component from '../components';

const mapStateToProps = (state) => {
        const fetchSucceeded = state.MapReducers.FetchSucceeded;
        const fetchFailed = state.MapReducers.FetchFailed;
        if (fetchSucceeded !== undefined) {
                return {
                        listRestaurant: fetchSucceeded.data
                };
        } else if (fetchFailed !== undefined) {
                return {
                        messages: fetchFailed.messages
                };
        } else {
                return {

                };
        }

};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchNearbyLocationRestaurant: (position) => {
                        dispatch(onFetchNearbyLocationRestaurant(position));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);