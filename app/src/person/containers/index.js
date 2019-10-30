import { connect } from 'react-redux';
import {
        onFetchAccountView,
        onResetPropsMain,
        onResetPropsMessageMain,
        onRefreshPostList
} from '../actions';
import Component from '../components/main';

const mapStateToProps = (state) => {
        const mainReducers = state.PersonReducers.MainReducers;
        if (mainReducers !== null) {
                if (mainReducers.fetchAccountViewSucceeded !== undefined) {
                        return {
                                account: mainReducers.fetchAccountViewSucceeded.data,
                                isLoading: false
                        };
                } else if (mainReducers.fetchAccountViewFailed !== undefined) {
                        return {
                                message: mainReducers.fetchAccountViewFailed.message,
                                isLoading: false
                        };
                }
                else if (mainReducers.resetPropsMain !== undefined) {
                        return mainReducers.resetPropsMain;
                } else if (mainReducers.resetPropsMessageMain !== undefined) {
                        return mainReducers.resetPropsMessageMain;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchAccountView: (idAccountView) => {
                        dispatch(onFetchAccountView(idAccountView));
                },
                onResetPropsMain: () => {
                        dispatch(onResetPropsMain());
                },
                onResetPropsMessageMain: () => {
                        dispatch(onResetPropsMessageMain());
                },
                onRefreshPostList: () => {
                        dispatch(onRefreshPostList());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);