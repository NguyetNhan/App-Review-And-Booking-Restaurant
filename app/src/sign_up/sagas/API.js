import { urlServer } from '../../config';

const urlSignup = `${urlServer}/auth/signup`;

SignUp = async (data) => {
        try {
                const response = await fetch(urlSignup, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                email: data.email,
                                password: data.password,
                                name: data.name,
                                phone: data.phone
                        })
                }).then(convertJson => convertJson.json());
                return response;
        } catch (error) {
                console.log('error: ', error.message);
        }
};

export const API = {
        SignUp
};