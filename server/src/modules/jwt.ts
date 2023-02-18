import jwt from 'jsonwebtoken';
import config from 'config';
import { errors } from '../helpers';

export const generateAccessToken = (data: any) => {
    const secretKey = config.get('app.secretKey');
    const accessTokenKey = `${secretKey}-access`;
    const accessTokenOption: jwt.SignOptions = config.get(
        'jwtOption.accessTokenOption',
    );
    const accessToken = jwt.sign(data, accessTokenKey, accessTokenOption);

    return accessToken;
};

export const generateRefreshToken = (data: any) => {
    const secretKey = config.get('app.secretKey');
    const refreshTokenKey = `${secretKey}-refresh`;
    const refreshTokenOption: jwt.SignOptions = config.get(
        'jwtOption.refreshTokenOption',
    );
    const refreshToken = jwt.sign(data, refreshTokenKey, refreshTokenOption);

    return refreshToken;
};

export const verifyUserAccessToken = (token: string) => {
    try {
        const secretKey = config.get('app.secretKey');
        const options: jwt.SignOptions = config.get(
            'jwtOption.accessTokenOption',
        );

        jwt.verify(token, `${secretKey}-access`, options);
        return jwt.decode(token, { complete: true });
    } catch (error: any) {
        if (error.name !== 'TokenExpiredError') {
            throw new errors.internalError.UnauthorizedError();
        }
        throw new errors.internalError.UnauthorizedError();
    }
};