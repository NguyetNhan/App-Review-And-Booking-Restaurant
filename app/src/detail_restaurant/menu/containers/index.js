import { connect } from 'react-redux';
import Component from '../components';
import { onAddMenu, onFetchMenu } from '../actions';

const mapStateToProps = (state) => {
        const addSucceeded = state.MenuReducers.AddSucceeded;
        const addFailed = state.MenuReducers.AddFailed;
        const fetchSucceeded = state.MenuReducers.FetchSucceeded;
        const fetchFailed = state.MenuReducers.FetchFailed;
        if (addSucceeded !== undefined) {
                return {
                        isLoading: false,
                        messages: 'Thêm món ăn thành công !'
                };
        } else if (addFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: addFailed.message
                };
        } else if (fetchSucceeded !== undefined) {
                return {
                        isLoading: false,
                        listMenu: fetchSucceeded.data
                };
        } else if (fetchFailed !== undefined) {
                return {
                        isLoading: false,
                        messages: fetchFailed.message
                };
        }
        else {
                return {
                        isLoading: false
                };
        }

};

const mapDispatchToProps = (dispatch) => {
        return {
                onAddMenu: (data) => {
                        dispatch(onAddMenu(data));
                },
                onFetchMenu: (data) => {
                        dispatch(onFetchMenu(data));
                }
        };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
