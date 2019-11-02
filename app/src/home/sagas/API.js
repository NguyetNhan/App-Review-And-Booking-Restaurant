import { urlServer } from '../../config';
const urlGetListRestaurant = `${urlServer}/restaurant/list-restaurant`;

fetchListFoodTheBest = async (page) => {
        try {
                const response = await fetch(`${urlServer}/menu/list-food-the-best/page/${page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(data => data.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};
fetchListPlaceTheBest = async (page) => {
        try {
                const response = await fetch(`${urlServer}/restaurant/place-review-the-best/page/${page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(data => data.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};
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
                return {
                        error: true,
                        message: error.message
                };
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
                return {
                        error: true,
                        message: error.message
                };
        }
};

fetchPostList = async (page) => {
        try {
                const response = await fetch(`${urlServer}/post/home/post-list/page/${page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(data => data.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const API = {
        fetchListRestaurantFormAPI,
        fetchListCoffeeFormAPI,
        fetchListPlaceTheBest,
        fetchListFoodTheBest,
        fetchPostList
};