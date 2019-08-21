import Realm from 'realm';
import { AccountModel } from '../../../models/account';

getIdAccount = async () => {
        try {
                const realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                var account = await realm.objects(AccountModel.Account);
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