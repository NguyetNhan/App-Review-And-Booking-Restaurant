import { connect } from 'react-redux';
import Component from '../components';
import { onFetchListMenu } from '../actions';

const mapStateToProps = (state) => {
        const fetchMenuSucceeded = state.OrderReducers.FetchMenuSucceeded;
        const fetchMenuFailed = state.OrderReducers.FetchMenuFailed;
        if (fetchMenuSucceeded !== undefined) {
                return {
                        listMenu: fetchMenuSucceeded.data
                };
        } else if (fetchMenuFailed !== undefined) {
                return {
                        messages: fetchMenuFailed.messages
                };
        } else {
                return {

                };
        }
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListMenu: (data) => {
                        dispatch(onFetchListMenu(data));
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

