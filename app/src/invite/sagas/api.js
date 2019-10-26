import { urlServer } from '../../config';

fetchInviteList = async (idAccount) => {
        try {
                const response = await fetch(`${urlServer}/invite/get-invite-list/idAccountClient/${idAccount}`, {
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
        fetchInviteList
};