import { urlServer } from '../../config';

fetchNotificationFromAPI = async (data) => {
        try {
                const response = await fetch(`${urlServer}/notification/idAccount/${data.idAccount}/page/${data.page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(data => data.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        messages: error.message,
                };
        }
};

export const API = {
        fetchNotificationFromAPI
};