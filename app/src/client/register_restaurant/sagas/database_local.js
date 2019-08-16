import Realm from 'realm';
const Account = 'Account';

const AccountSchema = {
        name: 'Account',
        primaryKey: 'id',
        properties: {
                authorities: 'string',
                email: 'string',
                name: 'string',
                phone: 'int',
                id: 'string'
        }
};

getIdAccount = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                var account = await realm.objects(Account);
                var idAccount = '';
                for (let data of account) {
                        idAccount = data.id;
                }
                return idAccount;
        } catch (error) {
                console.log('error: ', error);
        }
};

export const DatabaseLocal = {
        getIdAccount
};