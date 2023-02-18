import { Transaction } from 'knex';
import { errors } from '../../../helpers';
import { UserToken } from '../../models';

const upsertData = async (trx: Transaction | null, data?: any) => {
    try {
        await UserToken.upsert(trx, data);
    } catch (error: any) {
        throw new errors.internalError.CreateResourceError(
            'user token',
            null,
            error,
        );
    }
};

const getRefreshToken = async (
    trx: Transaction | null,
    refreshToken: string,
) => {
    try {
        const where = {
            refresh_token: refreshToken,
        };
        const result = await UserToken.findOne(trx, where, [
            ...UserToken.selectableProps,
        ]);
        return result;
    } catch (error: any) {
        throw new errors.internalError.FindResourceError(
            'user token',
            null,
            error,
        );
    }
};

const deleteRefreshToken = async (
    trx: Transaction | null,
    refreshToken = null,
    idEmployee = null,
    idAccount = null,
) => {
    try {
        const where = {
            id_employee: idEmployee,
            id_account: idAccount,
            refresh_token: undefined,
        };

        if (refreshToken != null) where.refresh_token = refreshToken;
        else delete where.refresh_token;

        const result = await UserToken.destroy(trx, false, where);
        return result;
    } catch (error: any) {
        throw new errors.internalError.DeleteResourceError('user token', null, error);
    }
};

export { upsertData, getRefreshToken, deleteRefreshToken };
