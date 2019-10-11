import { AccountModel } from '../../models/account';
addAccountIntoLocal = async (data) => {
        try {
                const create = await AccountModel.AddInfoAccountFromDatabaseLocal(data);
                return create;
        } catch (error) {
                return {
                        error: true,
                        message: error.message
                };
        }
};

export const databaseLocal = {
        addAccountIntoLocal
};

