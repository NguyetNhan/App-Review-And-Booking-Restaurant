import Realm from 'realm';

const Account = 'Account';
const AccountSchema = {
        name: Account,
        primaryKey: 'id',
        properties: {
                id: 'string',
                authorities: 'string',
                email: 'string',
                password: 'string',
                name: 'string',
                phone: 'int',
                avatar: 'string'
        }
};

AddInfoAccountFromDatabaseLocal = async (data) => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                const account = await realm.objects(Account);
                await realm.write(() => {
                        realm.delete(account);
                        if (data.avatar === null) {
                                realm.create(Account, {
                                        authorities: data.authorities,
                                        email: data.email,
                                        name: data.name,
                                        phone: data.phone,
                                        id: data.id,
                                        password: data.password,
                                        avatar: 'null'
                                });
                        } else {
                                realm.create(Account, {
                                        authorities: data.authorities,
                                        email: data.email,
                                        name: data.name,
                                        phone: data.phone,
                                        id: data.id,
                                        password: data.password,
                                        avatar: data.avatar
                                });
                        }
                });
                realm.close();
        } catch (error) {
                console.log('AddInfoAccountFromDatabaseLocal error: ', error);
        }
};

FetchInfoAccountFromDatabaseLocal = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                const account = await realm.objects(Account);
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
                                result.avatar = item.avatar;
                        }
                } else {
                        result = null;
                }
                //  realm.close();
                return result;
        } catch (error) {
                console.log('FetchInfoAccountFromDatabaseLocal error: ', error);
        }
};

DeleteAccountInfoFromDatabaseLocal = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                const account = await realm.objects(Account);
                realm.write(() => {
                        realm.delete(account);
                });
                realm.close();
        } catch (error) {
                console.log('DeleteAccountInfoFromDatabaseLocal error: ', error);
        }
};


export const AccountModel = {
        Account,
        AccountSchema,
        FetchInfoAccountFromDatabaseLocal,
        DeleteAccountInfoFromDatabaseLocal,
        AddInfoAccountFromDatabaseLocal
};