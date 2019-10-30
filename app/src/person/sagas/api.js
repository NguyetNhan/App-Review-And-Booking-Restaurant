import { urlServer } from '../../config';

fetchInfoAccount = async (idAccountView) => {
        try {
                const response = await fetch(`${urlServer}/auth/id/${idAccountView}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

sendFriendRequest = async (idAccountClient, idAccountFriend) => {
        try {
                const response = await fetch(`${urlServer}/friend/send-friend-request`, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                idAccountClient: idAccountClient,
                                idAccountFriend: idAccountFriend,
                        })
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

checkIsFriend = async (idAccountClient, idAccountFriend) => {
        try {
                const response = await fetch(`${urlServer}/friend/check-is-friend/idAccountClient/${idAccountClient}/idAccountFriend/${idAccountFriend}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

fetchPostList = async (idAccount, page) => {
        try {
                const response = await fetch(`${urlServer}/post/post-list/idAccount/${idAccount}/page/${page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

likePost = async (idPost, idAccount) => {
        try {
                const response = await fetch(`${urlServer}/post/like-post/idPost/${idPost}/idAccount/${idAccount}`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

checkLikePost = async (idPost, idAccount) => {
        try {
                const response = await fetch(`${urlServer}/post/check-has-liked/idPost/${idPost}/idAccount/${idAccount}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

accessPlaceInPost = async (idPost, idAccountView) => {
        try {
                const response = await fetch(`${urlServer}/post/update-view-restaurant/idPost/${idPost}/idAccountView/${idAccountView}`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const API = {
        fetchInfoAccount,
        sendFriendRequest,
        checkIsFriend,
        fetchPostList,
        checkLikePost,
        likePost,
        accessPlaceInPost
};