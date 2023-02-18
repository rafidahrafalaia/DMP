import _ from 'lodash';
import { utilities } from '.';
import * as errors from './errors';

const validatorWrapper = (fn: any) => (body: any, key: any, value?: any) => {
    try {
        fn(body, key, value);
        return { data: true, error: null };
    } catch (e) {
        return { data: null, error: e };
    }
};

/**
 * Validate existence value of key.
 * @param body A body key from req.
 * @param key A field name.
 * @param object A variable object
 * @param array A variable array
 */
export const required = validatorWrapper(
    (body: any, key: string, placement = 'body') => {
        if (!_.has(body, key)) {
            throw new errors.internalError.InCompleteKeyError(
                key,
                null,
                placement,
            );
        }
        if (body[key] === '' || body[key] === null) {
            throw new errors.internalError.InCompleteValueError(
                key,
                null,
                placement,
            );
        }
    },
);
export const requiredBody = validatorWrapper(
    (body: any, key: string, placement = 'body') => {
        if (!_.has(body, key)) {
            throw new errors.internalError.InCompleteKeyError(
                key,
                null,
                placement,
            );
        }
    },
);

export const number = validatorWrapper((body: any, key: string) => {
    if (!utilities.isNumber(Number(body[key]))) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const string = validatorWrapper((body: any, key: string) => {
    if (!utilities.isString(body[key])) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const email = validatorWrapper((body: any, key: string) => {
    if (!utilities.validateEmail(body[key])) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const integer = validatorWrapper((body: any, key: string) => {
    if (!utilities.isInteger(Number(body[key]))) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});
