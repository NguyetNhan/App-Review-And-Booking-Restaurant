import { urlServer } from '../../../config';

fetchDetailRestaurant = async (data) => {
        try {
                const response = await fetch(`${urlServer}/restaurant/id/${data}`, {
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

fetchScoreReview = async (data) => {
        try {
                const response = await fetch(`${urlServer}/reviews/sum-score-review/idReviewReceiver/${data}`, {
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

checkFollowedRestaurant = async (idRestaurant, idClient) => {
        try {
                const response = await fetch(`${urlServer}/follows/is-checked-follow/idRestaurant/${idRestaurant}/idClient/${idClient}`, {
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

changeFollowRestaurant = async (idRestaurant, idClient) => {
        try {
                const response = await fetch(`${urlServer}/follows/change-follow`, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                idRestaurant: idRestaurant,
                                idClient: idClient,
                        }),
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
}

export const API = {
        fetchDetailRestaurant,
        fetchScoreReview,
        changeFollowRestaurant,
        checkFollowedRestaurant
};