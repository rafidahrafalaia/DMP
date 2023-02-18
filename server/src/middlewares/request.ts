/**
 * Created by WebStorm.
 */
import { v4 as uuidv4 } from 'uuid';
import { Response, NextFunction } from 'express';
import { logger } from '../helpers';

const initiate = (req: any, res: Response, next: NextFunction) => {
    if (
        !req.headers['request-id']
        || req.headers['request-id'] === ''
        || req.headers['request-id'] === null
    ) req.headers['request-id'] = uuidv4();
    res.locals.requestId = req.headers['request-id'];

    logger.startRequest({
        requestId: req.headers['request-id'],
        user: res.locals.user,
        headers: req.headers,
        method: req.method,
        originalUrl: req.originalUrl,
        query: JSON.stringify(req.query),
        body: req.body,
    });

    next();
};

export { initiate };
