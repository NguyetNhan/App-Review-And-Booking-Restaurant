import { urlServer } from '../../config';
const urlSearch = `${urlServer}/restaurant/search`;

SearchRestaurantFromAPI = async (data) => {
        try {
                const response = await fetch(urlSearch, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                content: data.content,
                                type: data.type,
                                address: data.address
                        })
                }).then(data => data.json());
                return response;
        } catch (error) {
                console.log('error: ', error);
        }
};

export const API = {
        SearchRestaurantFromAPI
};