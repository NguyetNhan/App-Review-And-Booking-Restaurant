import Realm from 'realm';

const Account = 'Account';
const Conversation = 'Conversation';
const ConversationSchema = {
        name: Conversation,
        properties: {
                _id: 'string',
                idConversation: 'string',
                idUserReceiver: 'string',
                createDate: { type: 'date', default: Date.now() },
        }
};
const AccountSchema = {
        name: Account,
        primaryKey: 'id',
        properties: {
                id: 'string',
                authorities: 'string',
                email: 'string',
                password: 'string',
                name: 'string',
                score: { type: 'int', default: 0 },
                phone: 'int',
                avatar: { type: 'string', default: 'null' },
                conversation: { type: 'list', objectType: Conversation },
        }
};

AddInfoAccountFromDatabaseLocal = async (data) => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema, ConversationSchema] });
                const account = realm.objects(Account);
                var filter = account.filtered(`id like '${data._id}'`);
                if (filter.length === 0) {
                        realm.write(() => {
                                realm.delete(account);
                                if (data.avatar === null) {
                                        realm.create(Account, {
                                                authorities: data.authorities,
                                                email: data.email,
                                                name: data.name,
                                                phone: data.phone,
                                                id: data._id,
                                                password: data.password,
                                                score: data.score,
                                                conversation: data.conversation
                                        });
                                } else {
                                        realm.create(Account, {
                                                authorities: data.authorities,
                                                email: data.email,
                                                name: data.name,
                                                phone: data.phone,
                                                id: data._id,
                                                password: data.password,
                                                score: data.score,
                                                avatar: data.avatar,
                                                conversation: data.conversation
                                        });
                                }
                        });
                        return {
                                error: false,
                                message: 'Đăng nhập thành công !'
                        };
                } else {
                        return {
                                error: true,
                                message: 'Bạn đã đăng nhập !'
                        };
                }
        } catch (error) {
                console.log('error: ', error);
                return {
                        error: true,
                        message: error.message
                };
        }
};

FetchInfoAccountFromDatabaseLocal = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema, ConversationSchema] });
                const account = realm.objects(Account);
                var result = {
                        id: null,
                        authorities: null,
                        email: null,
                        password: null,
                        name: null,
                        phone: null,
                        avatar: null
                };
                if (account.length === 1) {
                        for (item of account) {
                                result.id = item.id;
                                result.authorities = item.authorities;
                                result.email = item.email;
                                result.password = item.password;
                                result.name = item.name;
                                result.phone = item.phone;
                                result.score = item.score;
                                result.avatar = item.avatar;
                                result.conversation = item.conversation;
                        }
                        return {
                                error: false,
                                data: result
                        };
                } else {
                        result = null;
                        return {
                                error: true,
                                data: result
                        };
                }
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

DeleteAccountInfoFromDatabaseLocal = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema, ConversationSchema] });
                const account = realm.objects(Account);
                realm.write(() => {
                        realm.delete(account);
                });
                return {
                        error: false,
                        message: 'ok'
                };
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

updateAccountInfoFromDatabaseLocal = async (idAccount, score) => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema, ConversationSchema] });
                realm.write(() => {
                        realm.create(Account, { id: idAccount, score: score }, true);
                });
                return {
                        error: false,
                        message: 'ok'
                };
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const AccountModel = {
        Account,
        AccountSchema,
        FetchInfoAccountFromDatabaseLocal,
        DeleteAccountInfoFromDatabaseLocal,
        AddInfoAccountFromDatabaseLocal,
        updateAccountInfoFromDatabaseLocal
};