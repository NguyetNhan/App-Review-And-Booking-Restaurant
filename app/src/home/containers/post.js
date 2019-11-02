import { connect } from 'react-redux';
import Component from '../components/post';
import {
        onFetchPostList,
        onResetPropsMessagePost,
        onResetPropsPost
} from '../actions';
const mapStateToProps = (state) => {
        const postReducers = state.HomeReducers.PostReducers;
        if (postReducers !== null) {
                if (postReducers.fetchPostListSucceeded !== undefined) {
                        return {
                                postList: postReducers.fetchPostListSucceeded.data.data,
                                page: postReducers.fetchPostListSucceeded.data.page,
                                total_page: postReducers.fetchPostListSucceeded.data.page,
                                isLoading: false
                        };
                } else if (postReducers.fetchPostListFailed !== undefined) {
                        return {
                                message: postReducers.fetchPostListFailed.message,
                                isLoading: false
                        };
                } else if (postReducers.resetProps !== undefined) {
                        return postReducers.resetProps;
                } else if (postReducers.resetPropsMessage !== undefined) {
                        return postReducers.resetPropsMessage;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchPostList: (page) => {
                        dispatch(onFetchPostList(page));
                },
                onResetPropsPost: () => {
                        dispatch(onResetPropsPost());
                },
                onResetPropsMessagePost: () => {
                        dispatch(onResetPropsMessagePost());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);