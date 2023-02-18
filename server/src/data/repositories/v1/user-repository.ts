import {
    User,
} from '../../models';
import { errors } from '../../../helpers';

const createClient = async (
    trx: any | null = null,
    data: any,
): Promise<number> => {
    try {
        const result = await User.create(trx, data);
        return result[0];
    } catch (error: any) {
        throw new errors.internalError.CreateResourceError(
            'user-client',
            null,
            error,
        );
    }
};

const getUserbyEmail = async (
    trx: any | null = null,
    data: any,
) => {
    try {
        const where = {
            email: data.email,
        };
        const select = [
            `${User.tableName}.id`,
            `${User.tableName}.email`,
            `${User.tableName}.password`,
        ];

        const result = await User.find(trx, where, select)
            .where(`${User.tableName}.status`, User.Status.ACTIVE);

        return result[0];
    } catch (error: any) {
        throw new errors.internalError.FindResourceError(
            'user client by email',
            null,
            error,
        );
    }
};

const getUserbyId = async (
    trx: any | null = null,
    data: any,
) => {
    try {
        const where = {
            email: data.email,
        };
        const select = [
            `${User.tableName}.id`,
            `${User.tableName}.email`,
            `${User.tableName}.password`,
        ];

        const result = await User.find(trx, where, select)
            .where(`${User.tableName}.status`, User.Status.ACTIVE);

        return result[0];
    } catch (error: any) {
        throw new errors.internalError.FindResourceError(
            'user client by email',
            null,
            error,
        );
    }
};



export {
    createClient,
    getUserbyEmail,
    getUserbyId
};
