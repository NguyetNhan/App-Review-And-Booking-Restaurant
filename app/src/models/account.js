import Realm from 'realm';


const Account = 'Account';
const AccountSchema = {
        name: 'Account',
        primaryKey: 'id',
        properties: {
                id: 'string',
                authorities: 'string',
                email: 'string',
                password: 'string',
                name: 'string',
                phone: 'int',
        }
};


FetchInfoAccountFromDatabaseLocal = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                const account = await realm.objects(Account);
                var result = {
                        id: '',
                        authorities: '',
                        email: '',
                        password: '',
                        name: '',
                        phone: '',
                };
                if (account.length == 1) {
                        for (item of account) {
                                result.id = item.id;
                                result.authorities = item.authorities;
                                result.email = item.email;
                                result.password = item.password;
                                result.name = item.name;
                                result.phone = item.phone;
                        }
                } else {
                        console.log('có nhiều tài khoản ');
                }
                realm.close();
                return result;
        } catch (error) {
                console.log('FetchInfoAccountFromDatabaseLocal error: ', error);
        }
};

DeleteAccountInfoFromDatabaseLocal = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                const account = await realm.objects(Account);
                await realm.write(async () => {
                        await realm.delete(account);
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
        DeleteAccountInfoFromDatabaseLocal
};