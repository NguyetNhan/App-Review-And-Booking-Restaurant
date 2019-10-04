import { urlServer } from '../../../config';
import FormData from 'FormData';
addReviewRestaurant = async (data) => {
        try {
                const formData = new FormData();
                for (var item of data.imageReview) {
                        formData.append('reviews', item);
                }
                formData.append('type', data.type);
                formData.append('idReviewAccount', data.idReviewAccount);
                formData.append('idReviewReceiver', data.idReviewReceiver);
                formData.append('content', data.content);
                formData.append('score', data.score);
                const response = await fetch(`${urlServer}/reviews/add-review`, {
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
                        messages: error.message,
                };
        }
};

updateReview = async (data) => {
        try {
                const formData = new FormData();
                for (var item of data.imageReview) {
                        formData.append('reviews', item);
                }
                formData.append('content', data.content);
                formData.append('score', data.score);
                const response = await fetch(`${urlServer}/reviews/update-review/idReview/${data.idReview}/idReviewReceiver/${data.idReviewReceiver}/idReviewAccount/${data.idReviewAccount}`, {
                        method: 'PUT',
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
                        messages: error.message,
                };
        }
};

checkOrderHasReview = async (idReviewReceiver, idAccountReview) => {
        try {
                const response = await fetch(`${urlServer}/reviews/check-client-has-orders/idReviewReceiver/${idReviewReceiver}/idReviewAccount/${idAccountReview}`, {
                        method: 'GET',
                        headers: {
                                'Accept': 'application/json',
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

fetchRestaurant = async (idRestaurant) => {
        try {
                const response = await fetch(`${urlServer}/restaurant/id/${idRestaurant}`, {
                        method: 'GET',
                        headers: {
                                'Accept': 'application/json',
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

fetchFood = async (idFood) => {
        try {
                const response = await fetch(`${urlServer}/menu/id/${idFood}`, {
                        method: 'GET',
                        headers: {
                                'Accept': 'application/json',
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

export const API = {
        addReviewRestaurant,
        checkOrderHasReview,
        updateReview,
        fetchFood,
        fetchRestaurant
};