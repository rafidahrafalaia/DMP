/**
 * Created by WebStorm.
 * User: darmawanefendi
 * Date: 2019-06-17
 * Time: 13:58
 */
import _ from 'lodash';
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { logger, utilities, errors } from '../helpers';

const requiredKeys = (req: Request, res: Response, next: NextFunction) => {
    logger.infoWithContext(res, '=== Headers Validation Started ===', null);
    const requiredHeaders: any = [
        {
            key: config.get('headers.X_API_KEY'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_DEVICE_TYPE'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_DEVICE_OS_VERSION'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_DEVICE_MODEL'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_APP_VERSION'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_DEVICE_UTC_OFFSET'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_DEVICE_LANG'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.X_DEVICE_NOTIFICATION_CODE'),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        {
            key: config.get('headers.CONTENT_TYPE'),
            methods: ['POST', 'PUT', 'PATCH'],
        },
    ];

    const requestHeaders = utilities.lowerCaseKeyObject(req.headers);
    const requestMethods = req.method.toUpperCase();

    let key = -1;
    res.locals.headers = {};
    for (let i = 0; i < requiredHeaders.length; i += 1) {
        if (!_.has(requestHeaders, requiredHeaders[i].key)) {
            if (requiredHeaders[i].methods.includes(requestMethods)) {
                key = i;
                break;
            }
        }
        res.locals.headers[requiredHeaders[i].key] = requestHeaders[requiredHeaders[i].key];
    }

    if (key > -1) {
        logger.warnWithContext(res, '=== Missing Required header key ===', {
            name: requiredHeaders[key].key,
        });
        return next(
            errors.httpError.badRequest([
                new errors.internalError.InCompleteKeyError(
                    `header: ${requiredHeaders[key].key}`,
                ),
            ]),
        );
    }
    logger.infoWithContext(res, '=== Headers Validation Ended ===', null);
    return next();
};

export { requiredKeys };
