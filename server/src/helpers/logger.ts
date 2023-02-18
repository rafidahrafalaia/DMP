/**
 * Created by WebStorm.
 * User: darmawanefendi
 * Date: 2019-06-17
 * Time: 13:40
 */

import flatted from 'flatted';
import { cloneDeep } from 'lodash';
import { Response } from 'express';
import { logger } from '../modules';

const asterisk = '***';

const attributesRedaction = (response: any) => {
    const data = cloneDeep(response);

    // start removing voucher code
    if (data && data.data && data.data.voucher_code) data.data.voucher_code = asterisk;
    if (data && data.data && Array.isArray(data.data)) {
        data.data.map((each: any, i: any) => {
            if (each.voucher_code) data.data[i].voucher_code = asterisk;
            return each;
        });
    }
    // end removing voucher code

    // start removing authorization
    if (data && data.headers && data.headers.authorization) data.headers.authorization = asterisk;
    // end removing authorization

    return data;
};

const getDataContext = (res: Response) => ({
    requestId: res.locals.requestId,
    requestDate: res.locals.requestDate,
});

export const warn = (message: string, data: any) => {
    logger.warn(message, { dataContext: flatted.stringify(data) });
};

export const error = (message: string, data: any) => {
    logger.error(message, { dataContext: flatted.stringify(data) });
};

export const verbose = (message: string, data: any) => {
    logger.verbose(message, { dataContext: flatted.stringify(data) });
};

export const debug = (data: any) => {
    logger.info(data);
};

export const silly = (message: string, data: any) => {
    logger.silly(message, { dataContext: flatted.stringify(data) });
};

export const infoWithContext = (res: Response, message: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.info(message, { dataContext: flatted.stringify(newDataContext) });
};

export const errorWithContext = (res: Response, message: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.error(message, { dataContext: flatted.stringify(newDataContext) });
};

export const warnWithContext = (res: Response, message: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.warn(message, { dataContext: flatted.stringify(newDataContext) });
};

export const verboseWithContext = (
    res: Response,
    message: string,
    data: any,
) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.verbose(message, { dataContext: flatted.stringify(newDataContext) });
};

export const debugWithContext = (res: Response, message: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.debug(message, { dataContext: flatted.stringify(newDataContext) });
};

export const sillyWithContext = (res: Response, message: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.silly(message, { dataContext: flatted.stringify(newDataContext) });
};

export const startProfile = (res: Response, name: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.profile(name, {
        level: 'debug',
        message: flatted.stringify({ dataContext: newDataContext }),
    });
};

export const endProfile = (res: Response, name: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, data);
    logger.profile(name, {
        level: 'debug',
        message: flatted.stringify({ dataContext: newDataContext }),
    });
};

export const originalError = (res: Response, message: string, data: any) => {
    const dataContext = getDataContext(res);
    const newDataContext = Object.assign(dataContext, {
        message: data.errors.message,
        stack: data.errors.stack,
    });
    logger.error(message, { dataContext: flatted.stringify(newDataContext) });
};

export const startRequest = (data: any) => {
    logger.info('START_REQUEST', attributesRedaction(data));
};

export const profiling = (res: Response, user: any) => {
    logger.info('PROFILING', {
        requestId: res.locals.requestId,
        user,
    });
};

export const errorException = (res: Response, data: any) => {
    logger.error('ERROR_EXCEPTION', {
        requestId: res.locals.requestId,
        ...data,
        originalError: data.originalError
            ? data.originalError.toString()
            : null,
        stack: data.originalError ? data.originalError.stack : null,
    });
};

export const rawResponse = (res: Response, data: any) => {
    logger.info('RAW_RESPONSE', {
        requestId: res.locals.requestId,
        rawResponse: data,
    });
};

export const axiosResponse = (
    data: any,
    requestId: string,
    message = 'MODULE_RESPONSE',
) => {
    logger.info(message, {
        requestId,
        formattedRequest: {
            headers: data?.config?.headers,
            endpoint: data?.config?.url,
            method: data?.config?.method,
        },
        formattedResponse: {
            code: data.status,
            data: data.data,
        },
    });
};

export const midtransGetStatusResponse = (
    data: any,
    requestId: string,
    message = 'MODULE_RESPONSE',
) => {
    logger.info(message, {
        requestId,
        formattedRequest: {
            headers: null,
            endpoint: null,
            method: null,
        },
        formattedResponse: {
            code: 200,
            data,
        },
    });
};

export const axiosErrorResponse = (
    data: any,
    requestId: string,
    message = 'MODULE_RESPONSE',
) => {
    logger.info(message, {
        requestId,
        axiosResponse: flatted.stringify(data),
        formattedResponse: {
            code: data?.status || 400,
            data: data?.response?.data || data?.data,
        },
    });
};

export const emailErrorResponse = (
    data: any,
    requestId: string,
    message = 'MODULE_RESPONSE',
) => {
    logger.info(message, {
        requestId,
        axiosResponse: flatted.stringify(data),
        formattedResponse: {
            code: 400,
            data,
        },
    });
};

export const info = (data: any, requestId?: string, message = '') => {
    logger.info(message, {
        requestId,
        data,
    });
};
