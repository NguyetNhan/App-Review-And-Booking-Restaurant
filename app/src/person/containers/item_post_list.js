import { connect } from 'react-redux';
import Component from '../components/item_post_list';
import {
        onLikePost,
        onCheckHasLikePost,
        onResetPropsItemPostList,
        onResetPropsMessageItemPostList,
        onAccessPlaceInPost
} from '../actions';

const mapStateToProps = (state) => {
        const itemPostListReducers = state.PersonReducers.ItemPostListReducers;
        if (itemPostListReducers !== null) {
                if (itemPostListReducers.checkLikeSucceeded !== undefined) {
                        return {
                                isLiked: itemPostListReducers.checkLikeSucceeded.data.isLiked
                        };
                } else if (itemPostListReducers.checkLikeFailed !== undefined) {
                        return {
                                message: itemPostListReducers.checkLikeFailed.message
                        };
                } else if (itemPostListReducers.resetProps !== undefined) {
                        return itemPostListReducers.resetProps;
                } else if (itemPostListReducers.resetPropsMessage !== undefined) {
                        return itemPostListReducers.resetPropsMessage;
                } else if (itemPostListReducers.likePost !== undefined) {
                        return itemPostListReducers.likePost;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onLikePost: (idPost, idAccount, isLiked) => {
                        dispatch(onLikePost(idPost, idAccount, isLiked));
                },
                onCheckHasLikePost: (idPost, idAccount) => {
                        dispatch(onCheckHasLikePost(idPost, idAccount));
                },
                onResetPropsItemPostList: () => {
                        dispatch(onResetPropsItemPostList());
                },
                onResetPropsMessageItemPostList: () => {
                        dispatch(onResetPropsMessageItemPostList());
                },
                onAccessPlaceInPost: (idPost, idAccountView) => {
                        dispatch(onAccessPlaceInPost(idPost, idAccountView));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);