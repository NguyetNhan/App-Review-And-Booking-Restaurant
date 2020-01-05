import { urlServer } from '../../config';

FetchListOrderForAdminRestaurant = async (data) => {
	try {
		const response = await fetch(`${urlServer}/order/admin/${data.idAdmin}/page/${data.page}/filter/${data.filter}`, {
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

FetchListOrderForClient = async (data) => {
	try {
		const response = await fetch(`${urlServer}/order/client/${data.idClient}/page/${data.page}/filter/${data.filter}`, {
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
	FetchListOrderForAdminRestaurant,
	FetchListOrderForClient
};