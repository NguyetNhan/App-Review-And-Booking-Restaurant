import { connect } from 'react-redux';
import Component from '../components';
import { onFetchDetailRestaurant } from '../actions';

const mapStateToProps = (state) => {
        const fetchSucceeded = state.OverviewReducers.FetchSucceeded;
        const fetchFailed = state.OverviewReducers.FetchFailed;
        if (fetchSucceeded !== undefined) {
                return {
                        restaurant: fetchSucceeded.data
                };
        } else if (fetchFailed !== undefined) {
                return {
                        messages: fetchFailed.message
                };
        } else {
                return {

                };
        }

};
const mapDispatchToProps = (dispatch) => {
        return {
                onFetchDetailRestaurant: (data) => {
                        dispatch(onFetchDetailRestaurant(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
