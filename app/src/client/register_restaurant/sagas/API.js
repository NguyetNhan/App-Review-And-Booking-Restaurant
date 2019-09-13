import { urlServer } from '../../../config';
import FormData from 'FormData';
const urlRegisterRestaurant = `${urlServer}/restaurant/register-restaurant`;

RegisterRestaurant = async (data, idAccount) => {
        try {
                const formData = new FormData();
                for (var item of data.image) {
                        formData.append('restaurant', item);
                }
                formData.append('name', data.name);
                formData.append('introduce', data.introduce);
                formData.append('address', data.address);
                formData.append('phone', data.phone);
                formData.append('idAdmin', idAccount);
                formData.append('type', data.type);
                formData.append('time_activity', data.time);
                formData.append('latitude', data.position.latitude);
                formData.append('longitude', data.position.longitude);
                const response = await fetch(urlRegisterRestaurant, {
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data',
                        },
                        body: formData,
                }).then(value => value.json());
                return response;
        } catch (error) {
                console.log('error: ', error);
        }
};

export const API = {
        RegisterRestaurant
};