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
}

export const API = {
        fetchInfoAccount,
        sendFriendRequest,
        checkIsFriend
};