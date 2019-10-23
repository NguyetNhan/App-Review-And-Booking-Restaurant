import { urlServer } from '../../config';

fetchStrangerList = async (idAccount, geolocation) => {
        try {
                const response = await fetch(`${urlServer}/map/get-position-stranger/idAccount/${idAccount}/latitude/${geolocation.latitude}/longitude/${geolocation.longitude}`, {
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
        fetchStrangerList
};