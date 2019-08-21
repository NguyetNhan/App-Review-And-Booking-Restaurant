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

export const AccountModel = {
        Account, AccountSchema
};