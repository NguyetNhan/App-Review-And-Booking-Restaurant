import { urlServer } from '../../../config';


fetchListReview = async (data) => {
        try {
                const response = await fetch(`${urlServer}/reviews/idReviewReceiver/${data.idRestaurant}/page/${data.page}`, {
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
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
        fetchListReview
};