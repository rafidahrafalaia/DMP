import { Request, Response, NextFunction } from 'express';
import { verifyUserAccessToken } from '../modules/jwt';
import { errors, validators, logger } from '../helpers';

const verifyToken = async (req: Request, res: Response, headers: any) => {
    let token = headers.authorization;
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    const decodedJwt: any = verifyUserAccessToken(token);

    res.locals.user = {
        id_user: decodedJwt?.payload.id_user,
        email: decodedJwt?.payload.email,
    };

    logger.profiling(res, res.locals.user);
};

export const closedAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { headers } = req;
        const errorValidator = [];
        const errs: any = [];

        errorValidator.push(
            validators.required(headers, 'authorization', 'header'),
        );

        errorValidator.forEach((each) => {
            if (each.error) errs.push(each.error);
        });

        if (errs.length > 0) throw errors.httpError.badRequest(errs);

        if (headers.authorization) {
            await verifyToken(req, res, headers);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const openAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { headers } = req;

        res.locals.user = {
            userType: 'anonymous',
        };

        if (headers.authorization) {
            await verifyToken(req, res, headers);
        }

        next();
    } catch (error) {
        next(error);
    }
};
