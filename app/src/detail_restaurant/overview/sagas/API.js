import { urlServer } from '../../../config';

FetchDetailRestaurant = async (data) => {
        try {
                const response = await fetch(`${urlServer}/restaurant/id/${data}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(data => data.json());
                return response;
        } catch (error) {
                console.log('error: ', error);
        }
};

export const API = {
        FetchDetailRestaurant
};