import Realm from 'realm';
import { AccountModel } from '../../models/account';
AddAccountIntoLocal = async (data) => {
        try {
                const realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                var account = await realm.objects(AccountModel.Account);
                var filter = account.filtered(`id like '${data._id}'`);
                if (filter.length === 0) {
                        await realm.write(() => {
                                if (data.avatar === null) {
                                        realm.create(AccountModel.Account, {
                                                authorities: data.authorities,
                                                email: data.email,
                                                name: data.name,
                                                phone: data.phone,
                                                id: data._id,
                                                password: data.password,
                                                avatar: 'null'
                                        });
                                } else {
                                        realm.create(AccountModel.Account, {
                                                authorities: data.authorities,
                                                email: data.email,
                                                name: data.name,
                                                phone: data.phone,
                                                id: data._id,
                                                password: data.password,
                                                avatar: data.avatar
                                        });
                                }
                        });
                        realm.close();
                        return {
                                error: false,
                                message: 'Đăng nhập thành công !',
                                data: data
                        };
                } else {
                        realm.close();
                        return {
                                error: true,
                                message: 'Bạn đã đăng nhập !'
                        };
                }
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const DatabaseLocal = {
        AddAccountIntoLocal
};

