import { urlServer } from '../../config';

FetchMenuFromAPI = async (data) => {
        try {
                const response = await fetch(`${urlServer}/menu/idRestaurant/${data.idRestaurant}/page/${data.page}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(data => data.json());
                return response;
        } catch (error) {
                console.log('FetchMenuFromAPI error: ', error);
        }
};

AddOrderIntoDatabase = async (data) => {
        try {
                const response = await fetch(`${urlServer}/order/add-order`, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                idClient: data.idClient,
                                idRestaurant: data.idRestaurant,
                                customerName: data.customerName,
                                customerEmail: data.customerEmail,
                                customerPhone: data.customerPhone,
                                amountPerson: data.amountPerson,
                                food: data.food,
                                receptionTime: data.receptionTime,
                                totalMoney: data.totalMoney,
                                note: data.note,
                        })
                }).then(value => value.json());
                return response;
        } catch (error) {
                console.log('error: ', error);

        }
};


export const API = {
        FetchMenuFromAPI,
        AddOrderIntoDatabase
};