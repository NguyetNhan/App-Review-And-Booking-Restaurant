import { urlServer } from '../../config';

updateFriendList = async (idAccount, phoneList) => {
        try {
                const response = await fetch(`${urlServer}/friend/contacts`, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                idAccount: idAccount,
                                phoneList: phoneList
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

fetchFriendList = async (idAccount) => {
        try {
                const response = await fetch(`${urlServer}/friend/get-friend/idAccount/${idAccount}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
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
        updateFriendList,
        fetchFriendList
};