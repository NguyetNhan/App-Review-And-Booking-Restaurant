import { connect } from 'react-redux';
import Component from '../components/post_list';
import {
        onFetchPostList,
        onResetPropsPostList,
        onResetPropsMessagePostList
} from '../actions';

const mapStateToProps = (state) => {
        const postListReducers = state.PersonReducers.PostListReducers;
        if (postListReducers !== null) {
                if (postListReducers.fetchPostListSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                postList: postListReducers.fetchPostListSucceeded.data.data,
                                page: postListReducers.fetchPostListSucceeded.data.page,
                                total_page: postListReducers.fetchPostListSucceeded.data.total_page
                        };
                } else if (postListReducers.fetchPostListFailed !== undefined) {
                        return {
                                message: postListReducers.fetchPostListFailed.message,
                                isLoading: false
                        };
                } else if (postListReducers.resetProps !== undefined) {
                        return postListReducers.resetProps;
                } else if (postListReducers.resetPropsMessage !== undefined) {
                        return postListReducers.resetPropsMessage;
                } else if (postListReducers.refreshPostList !== undefined) {
                        return {
                                refreshPostList: true
                        };
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchPostList: (idAccount, page) => {
                        dispatch(onFetchPostList(idAccount, page));
                },
                onResetPropsPostList: () => {
                        dispatch(onResetPropsPostList());
                },
                onResetPropsMessagePostList: () => {
                        dispatch(onResetPropsMessagePostList());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);