import moment from 'moment';
import config from 'config';
import knex from '../../data/knex';
import { errors } from '../../helpers';
import { compare } from '../../helpers/bcrypt';
import { userRepository, userTokenRepository } from '../../data/repositories/v1';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../../modules/jwt';

const createUserToken = async (
    trx: any,
    clientUserId: number,
    refreshToken: string,
) => {
    const expiresIn = `${config.get('jwtOption.refreshTokenOption.expiresIn')}`;
    const expired = expiresIn.split(' ');
    const units: any = expired[1];

    const expiredAt = moment()
        .utc()
        .add(expired[0], units)
        .format('YYYY-MM-DD HH:mm:ss');

    const data = {
        id_user: clientUserId,
        refresh_token: refreshToken,
        expired_at: expiredAt,
    };

    await userTokenRepository.upsertData(trx, data);

    return true;
};

const loginAccount = async (headers: any) => {
    const header = headers.authorization.split(/\s+/).pop() || '';
    const auth = Buffer.from(header, 'base64').toString().split(/:/);
    const username = auth.shift();
    const password = auth.join(':');
    const result = await knex.transaction(async (trx) => {
        const response = await userRepository.getUserbyEmail(null, { email: username });
        if (!response) throw errors.httpError.unAuthorize('email/password is incorrect');
        if (!compare(password, response.password)) throw errors.httpError.unAuthorize('email/password is incorrect');
        const account = {
            id_user: response.id,
            email: response.email,
        };

        const accessToken = generateAccessToken(account);
        const refreshToken = generateRefreshToken(account);

        const data = {
            ...account,
            accessToken,
            refreshToken,
        };
        await createUserToken(trx, account.id_user, refreshToken);
        await trx.commit(data);
    });

    return result;
};


const renewRefreshToken = async (headers: any) => {
    const result = await knex.transaction(async (trx) => {
        try {
            const token = headers.refresh_token;
            const userToken = await userTokenRepository.getRefreshToken(
                null,
                token,
            );
            if (!userToken) throw new errors.internalError.UnauthorizedError();
            const userData = await userRepository.getUserbyId(knex, {id: userToken?.payload.id_user} )
            const user = {
                id_user: userToken?.payload.id_user,
                email: userData?.email,
            };

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            await createUserToken(
                trx,
                user.id_user,
                refreshToken,
            );
            await userTokenRepository.deleteRefreshToken(trx, token);

            const data = {
                ...user,
                accessToken,
                refreshToken,
            };
            await trx.commit(data);
        } catch (error) {
            await trx.rollback(error);
            throw error;
        }
    });

    return result;
};
export {
    loginAccount,
    renewRefreshToken,
};
