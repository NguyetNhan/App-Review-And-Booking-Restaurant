import { urlServer } from '../../../config';
const urlConfirmRestaurant = `${urlServer}/restaurant/confirm-restaurant`;

fetchListConfirmRestaurant = async () => {
        try {
                const response = await fetch(urlConfirmRestaurant, {
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

confirmRestaurantAgree = async (data) => {
        try {
                const response = await fetch(`${urlConfirmRestaurant}/${data.idRestaurant}/${data.idAdmin}`, {
                        method: 'PUT',
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

confirmRestaurantCancel = async (data) => {
        try {
                const response = await fetch(`${urlConfirmRestaurant}/${data.idRestaurant}`, {
                        method: 'DELETE',
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
        fetchListConfirmRestaurant,
        confirmRestaurantCancel,
        confirmRestaurantAgree
};