import { urlServer } from '../../config';

FetchListOrderForAdminRestaurant = async (data) => {
        try {
                const response = await fetch(`${urlServer}/order/admin/${data.idAdmin}/page/${data.page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(value => value.json());
                return response;
        } catch (error) {
                console.log('error: ', error);
        }
};

export const API = {
        FetchListOrderForAdminRestaurant
};