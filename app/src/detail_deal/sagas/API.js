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
                return {
                        error: true,
                        messages: error.message,
                };
        }
};


confirmOrder = async (data) => {
        try {
                const response = await fetch(`${urlServer}/order/confirm-order/idAccount/${data.idAccount}/idOrder/${data.idOrder}/status/${data.status}`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        messages: error.message,
                        data: error
                };
        }
};

export const API = {
        fetchDetailOrder,
        confirmOrder,
};