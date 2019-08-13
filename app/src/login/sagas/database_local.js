import Realm from 'realm';

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

AddAccountIntoLocal = async (data) => {
        try {
                const realm = await Realm.open({ schema: [AccountSchema] });
                var account = await realm.objects('Account');
                var filter = account.filtered(`id like '${data._id}'`);
                if (filter.length === 0) {
                        await realm.write(() => {
                                realm.create('Account', {
                                        authorities: data.authorities,
                                        email: data.email,
                                        name: data.name,
                                        phone: data.phone,
                                        id: data._id
                                });
                        });
                        realm.close();
                        return {
                                error: false,
                                message: 'Đăng nhập thành công !',
                                authorities: data.authorities
                        };
                } else {
                        realm.close();
                        return {
                                error: true,
                                message: 'Bạn đã đăng nhập !'
                        };
                }
        } catch (error) {
                console.log(error);
        }
};

export const DatabaseLocal = {
        AddAccountIntoLocal
};

