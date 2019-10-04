import { urlServer } from '../../../config';

confirmOrder = async (data) => {
        try {
                const response = await fetch(`${urlServer}/order/admin-restaurant/idAdmin/${data.idAdmin}/confirm-order/idOrder/${data.idOrder}`, {
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
                        messages: error.message
                };
        }
};

export const API = {
        confirmOrder
};

