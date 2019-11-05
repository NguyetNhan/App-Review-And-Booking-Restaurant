import {
        FETCH_ACCOUNT_VIEW,
        FETCH_ACCOUNT_VIEW_FAILED,
        FETCH_ACCOUNT_VIEW_SUCCEEDED,
        RESET_PROPS_MESSAGE_MAIN_PERSON,
        RESET_PROPS_MAIN_PERSON,
        ADD_FRIEND,
        ADD_FRIEND_FAILED,
        ADD_FRIEND_SUCCEEDED,
        REMOVE_FRIEND,
        REMOVE_FRIEND_FAILED,
        REMOVE_FRIEND_SUCCEEDED,
        CHECK_IS_FRIEND,
        CHECK_IS_FRIEND_FAILED,
        CHECK_IS_FRIEND_SUCCEEDED,
        RESET_PROPS_HEADER_PERSON,
        RESET_PROPS_MESSAGE_HEADER_PERSON,
        FETCH_POST_LIST_FOR_PERSON,
        FETCH_POST_LIST_FOR_PERSON_FAILED,
        FETCH_POST_LIST_FOR_PERSON_SUCCEEDED,
        RESET_PROPS_MESSAGE_POST_LIST,
        RESET_PROPS_POST_LIST,
        REFRESH_POST_LIST,
        CHECK_HAS_LIKE_POST_FOR_PERSON,
        CHECK_HAS_LIKE_POST_FOR_PERSON_FAILED,
        CHECK_HAS_LIKE_POST_FOR_PERSON_SUCCEEDED,
        LIKE_POST_FOR_PERSON,
        RESET_PROPS_ITEM_POST_LIST,
        RESET_PROPS_MESSAGE_ITEM_POST_LIST,
        ACCESS_PLACE_IN_POST,
        REFRESH_COMMENT_REPLY
} from './types';

export const onRefreshCommentReply = () => {
        return {
                type: REFRESH_COMMENT_REPLY
        };
};

export const onAccessPlaceInPost = (idPost, idAccountView) => {
        return {
                type: ACCESS_PLACE_IN_POST,
                idPost, idAccountView
        };
};

export const onResetPropsMessageItemPostList = () => {
        return {
                type: RESET_PROPS_MESSAGE_ITEM_POST_LIST
        };
};

export const onResetPropsItemPostList = () => {
        return {
                type: RESET_PROPS_ITEM_POST_LIST
        };
};
export const onCheckHasLikePostFailed = (message) => {
        return {
                type: CHECK_HAS_LIKE_POST_FOR_PERSON_FAILED,
                message
        };
};
export const onCheckHasLikePostSucceeded = (data) => {
        return {
                type: CHECK_HAS_LIKE_POST_FOR_PERSON_SUCCEEDED,
                data
        };
};
export const onCheckHasLikePost = (idPost, idAccount) => {
        return {
                type: CHECK_HAS_LIKE_POST_FOR_PERSON,
                idPost, idAccount
        };
};

export const onLikePost = (idPost, idAccount, isLiked) => {
        return {
                type: LIKE_POST_FOR_PERSON,
                idPost, idAccount, isLiked
        };
};

export const onRefreshPostList = () => {
        return {
                type: REFRESH_POST_LIST
        };
};

export const onResetPropsMessagePostList = () => {
        return {
                type: RESET_PROPS_MESSAGE_POST_LIST
        };
};

export const onResetPropsPostList = () => {
        return {
                type: RESET_PROPS_POST_LIST
        };
};

export const onFetchPostList = (idAccount, page) => {
        return {
                type: FETCH_POST_LIST_FOR_PERSON,
                idAccount,
                page
        };
};

export const onFetchPostListSucceeded = (data) => {
        return {
                type: FETCH_POST_LIST_FOR_PERSON_SUCCEEDED,
                data
        };
};
export const onFetchPostListFailed = (message) => {
        return {
                type: FETCH_POST_LIST_FOR_PERSON_FAILED,
                message
        };
};

export const onResetPropsHeader = () => {
        return {
                type: RESET_PROPS_HEADER_PERSON
        };
};

export const onResetPropsMessageHeader = () => {
        return {
                type: RESET_PROPS_MESSAGE_HEADER_PERSON
        };
};

export const onRemoveFriend = (idAccountClient, idAccountFriend) => {
        return {
                type: REMOVE_FRIEND,
                idAccountClient,
                idAccountFriend
        };
};

export const onRemoveFriendSucceeded = (data) => {
        return {
                type: REMOVE_FRIEND_SUCCEEDED,
                data
        };
};

export const onRemoveFriendFailed = (message) => {
        return {
                type: REMOVE_FRIEND_FAILED,
                message
        };
};

export const onAddFriend = (idAccountClient, idAccountFriend) => {
        return {
                type: ADD_FRIEND,
                idAccountClient,
                idAccountFriend
        };
};

export const onAddFriendSucceeded = (data) => {
        return {
                type: ADD_FRIEND_SUCCEEDED,
                data
        };
};

export const onAddFriendFailed = (message) => {
        return {
                type: ADD_FRIEND_FAILED,
                message
        };
};

export const onCheckIsFriend = (idAccountClient, idAccountFriend) => {
        return {
                type: CHECK_IS_FRIEND,
                idAccountClient,
                idAccountFriend
        };
};

export const onCheckIsFriendSucceeded = (data) => {
        return {
                type: CHECK_IS_FRIEND_SUCCEEDED,
                data
        };
};

export const onCheckIsFriendFailed = (message) => {
        return {
                type: CHECK_IS_FRIEND_FAILED,
                message
        };
};

export const onResetPropsMain = () => {
        return {
                type: RESET_PROPS_MAIN_PERSON
        };
};

export const onResetPropsMessageMain = () => {
        return {
                type: RESET_PROPS_MESSAGE_MAIN_PERSON
        };
};

export const onFetchAccountView = (idAccountView) => {
        return {
                type: FETCH_ACCOUNT_VIEW,
                idAccountView
        };
};

export const onFetchAccountViewSucceeded = (data) => {
        return {
                type: FETCH_ACCOUNT_VIEW_SUCCEEDED,
                data
        };
};

export const onFetchAccountViewFailed = (message) => {
        return {
                type: FETCH_ACCOUNT_VIEW_FAILED,
                message
        };
};