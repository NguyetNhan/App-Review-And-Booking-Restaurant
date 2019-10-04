import { urlServer } from '../../config';

searchRestaurantAndClientFromAPI = async (data) => {
        try {
                const response = await fetch(`${urlServer}/search/content-search/${data}`, {
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
                        messages: error.message,
                };
        }
};

searchRestaurantFromAPI = async (contentSearch, page) => {
        try {
                const response = await fetch(`${urlServer}/search/search-restaurant/content-search/${contentSearch}/page/${page}`, {
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
                        messages: error.message,
                };
        }
};

searchClientFromAPI = async (contentSearch, page) => {
        try {
                const response = await fetch(`${urlServer}/search/search-client/content-search/${contentSearch}/page/${page}`, {
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
                        messages: error.message,
                };
        }
};


export const API = {
        searchRestaurantAndClientFromAPI,
        searchClientFromAPI,
        searchRestaurantFromAPI
};