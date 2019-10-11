import { urlServer } from '../../config';
const urlGetListRestaurant = `${urlServer}/restaurant/list-restaurant`;

fetchListRestaurantFormAPI = async (data) => {
        try {
                const response = await fetch(`${urlGetListRestaurant}/type/${data.type}/page/${data.page}`, {
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


fetchListCoffeeFormAPI = async (data) => {
        try {
                const response = await fetch(`${urlGetListRestaurant}/type/${data.type}/page/${data.page}`, {
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
        fetchListRestaurantFormAPI,
        fetchListCoffeeFormAPI,
};