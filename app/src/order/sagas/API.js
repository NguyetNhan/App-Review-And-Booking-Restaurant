import { urlServer } from '../../config';

FetchMenuFromAPI = async (idRestaurant) => {
        try {
                const response = await fetch(`${urlServer}/menu/idRestaurant/${idRestaurant}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(data => data.json());
                return response;
        } catch (error) {
                console.log('FetchMenuFromAPI error: ', error);
        }
};

export const API = {
        FetchMenuFromAPI
};