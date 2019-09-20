import { urlServer } from '../../config';

fetchDetailOrder = async (idOrder) => {
        try {
                const response = await fetch(`${urlServer}/order/id/${idOrder}`, {
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
        fetchDetailOrder
};