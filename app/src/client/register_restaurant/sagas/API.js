import { urlServer } from '../../../config';
import FormData from 'FormData';
const urlRegisterRestaurant = `${urlServer}/restaurant/register-restaurant`;

RegisterRestaurant = async (data) => {
        try {
                const formData = new FormData();
                for (var item of data.image) {
                        formData.append('restaurant', item);
                }
                formData.append('name', data.name);
                formData.append('introduce', data.introduce);
                formData.append('address', data.address);
                formData.append('phone', data.phone);
                formData.append('idAdmin', data.idAdmin);
                formData.append('type', data.type);
                formData.append('timeOpen', data.timeOpen);
                formData.append('timeClose', data.timeClose);
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
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const API = {
        RegisterRestaurant
};