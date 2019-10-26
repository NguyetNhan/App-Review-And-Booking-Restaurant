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
                return {
                        error: true,
                        message: error.message,
                };
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
                                totalMoneyFood: data.totalMoneyFood,
                                discount: data.discount,
                                totalMoney: data.totalMoney,
                                note: data.note,
                                guests: data.guests
                        })
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        messages: error.message,
                };
        }
};


export const API = {
        FetchMenuFromAPI,
        AddOrderIntoDatabase
};