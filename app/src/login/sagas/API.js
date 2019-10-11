import { urlServer } from '../../config';

const urlLogin = `${urlServer}/auth/login`;

login = async (data) => {
        try {
                const response = await fetch(urlLogin, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                email: data.email,
                                password: data.password,
                        })
                }).then(convertJson => convertJson.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const API = {
        login
};