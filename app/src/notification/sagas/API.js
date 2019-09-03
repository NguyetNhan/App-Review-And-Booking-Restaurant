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
                console.log('fetchNotificationFromAPI error : ', error);
        }
};

export const API = {
        fetchNotificationFromAPI
};