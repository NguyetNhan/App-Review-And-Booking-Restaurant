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

confirmOrder = async (data) => {
        try {
                const response = await fetch(`${urlServer}/order/confirm-order/idOrder/${data.idOrder}/status/${data.status}`, {
                        method: 'PUT',
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
        fetchDetailOrder,
        confirmOrder
};