import { urlServer } from '../../config';
import FormData from 'FormData';

fetchPlaceList = async (idAccount) => {
        try {
                const response = await fetch(`${urlServer}/post/place-list-has-arrived/idAccount/${idAccount}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

addPost = async (data) => {
        try {
                const formData = new FormData();
                for (var item of data.image) {
                        formData.append('post', item);
                }
                formData.append('idAccount', data.idAccount);
                formData.append('content', data.content);
                formData.append('idRestaurant', data.idRestaurant);
                formData.append('typePost', data.typePost);
                const response = await fetch(`${urlServer}/post/create-post`, {
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
        fetchPlaceList,
        addPost
};