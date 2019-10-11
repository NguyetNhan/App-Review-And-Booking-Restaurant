import { urlServer } from '../../config';

checkConversationExist = async (idSend, idReceiver) => {
        try {
                const response = await fetch(`${urlServer}/conversation/check-conversation`, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                idAccountSend: idSend,
                                idAccountReceiver: idReceiver
                        })
                }).then(value => value.json());
                return response;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

fetchListMessage = async (idConversation, page) => {
        try {
                const response = await fetch(`${urlServer}/message/list-message/idConversation/${idConversation}/page/${page}`, {
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

sendMessage = async (idConversation, idSender, content) => {
        try {
                const response = await fetch(`${urlServer}/message/send-message`, {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                idConversation: idConversation,
                                idSender: idSender,
                                content: content,
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
        checkConversationExist,
        fetchListMessage,
        sendMessage
};
