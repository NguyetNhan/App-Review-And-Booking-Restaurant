import { connect } from 'react-redux';
import { onSearchRestaurant } from '../actions';
import Component from '../components';

const mapStateToProps = (state) => {
        const data = state.SearchReducers.SearchSucceeded;
        if (data !== undefined) {
                return {
                        listRestaurant: data.data,
                };
        } else {
                return {
                };
        }

};
const mapDispatchToProps = (dispatch) => {
        return {
                onSearchRestaurant: (data) => {
                        dispatch(onSearchRestaurant(data));
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);