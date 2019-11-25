import { urlServer } from '../../../config';
import FormData from 'FormData';
const urlAddMenu = `${urlServer}/menu/add-menu`;
AddMenuOnAPI = async (data) => {
        try {
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('introduce', data.moTa);
                formData.append('price', data.price);
                formData.append('menu', data.image);
                formData.append('idRestaurant', data.idRestaurant);
                const response = await fetch(urlAddMenu, {
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
                        message: 'Thêm món ăn thất bại. ' + error.message
                };
        }
};

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
                        message: 'Lấy danh sách thất bại. ' + error.message
                };
        }
};

export const API = {
        AddMenuOnAPI,
        FetchMenuFromAPI
};