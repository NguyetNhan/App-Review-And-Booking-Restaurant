import { urlServer } from '../../config';

FetchNearbyLocationRestaurant = async (position) => {
        try {
                const response = await fetch(`${urlServer}/map/closest-distance/latitude/${position.latitude}/longitude/${position.longitude}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(data => data.json());
                return response;
        } catch (error) {
                console.log('error: ', error);
        }
};

export const API = {
        FetchNearbyLocationRestaurant
};