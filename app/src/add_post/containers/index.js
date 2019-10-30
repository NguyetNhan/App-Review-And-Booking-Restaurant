import { connect } from 'react-redux';
import {
        onAddPost,
        onResetPropsMain,
        onResetPropsMessageMain
} from '../actions';
import Component from '../components/main';

const mapStateToProps = (state) => {
        const mainReducers = state.AddPostReducers.MainReducers;
        if (mainReducers !== null) {
                if (mainReducers.addPostSucceeded !== undefined) {
                        return {
                                messageSucceeded: mainReducers.addPostSucceeded.message,
                                isLoadingPost: false
                        };
                } else if (mainReducers.addPostFailed !== undefined) {
                        return {
                                messageFailed: mainReducers.addPostFailed.message,
                                isLoadingPost: false
                        };
                } else if (mainReducers.resetProps !== undefined) {
                        return mainReducers.resetProps;
                } else if (mainReducers.resetPropsMessage !== undefined) {
                        return mainReducers.resetPropsMessage;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onAddPost: (data) => {
                        dispatch(onAddPost(data));
                },
                onResetPropsMain: () => {
                        dispatch(onResetPropsMain());
                },
                onResetPropsMessageMain: () => {
                        dispatch(onResetPropsMessageMain());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);