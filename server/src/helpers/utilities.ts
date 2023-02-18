import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

export const controllerWrapper = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await fn(req, res, next);
    } catch (err) {
        return next(err);
    }
};

export const validateEmail = (email: string) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const isNumber = (number: any) => {
    const re = /^[0-9]+([,.][0-9]+)?$/g;
    return re.test(number);
};

export const isString = (value: unknown) => typeof value === 'string' || value instanceof String;

export const lowerCaseKeyObject = (object: object) => _.mapKeys(object, (v, k) => k.toLowerCase());

export const isInteger = (number: unknown) => Number.isInteger(Number(number));
