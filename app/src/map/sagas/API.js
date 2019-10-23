import { urlServer } from '../../config';

fetchNearbyLocationPlace = async (position) => {
        try {
                const response = await fetch(`${urlServer}/map/closest-distance/latitude/${position.latitude}/longitude/${position.longitude}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(data => data.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

fetchPositionFriend = async (idAccount) => {
        try {
                const response = await fetch(`${urlServer}/map/get-position-friend/idAccount/${idAccount}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
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
        fetchNearbyLocationPlace,
        fetchPositionFriend
};