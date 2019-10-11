import { urlServer } from '../../config';

fetchListConversationFromAPI = async (idAccount, page) => {
        try {
                const response = await fetch(`${urlServer}/conversation/list-conversation/idAccount/${idAccount}/page/${page}`, {
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
};

fetchInfoAccountFromAPI = async (idAccount) => {
        try {
                const response = await fetch(`${urlServer}/auth/id/${idAccount}`, {
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
};

export const API = {
        fetchListConversationFromAPI,
        fetchInfoAccountFromAPI
};