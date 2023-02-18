import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import {
    auth, dansmultipro
} from './routes';
import {
    parsers, responses, errors, logger,
} from './helpers';
import { requestMiddleware } from './middlewares';
import { testDb } from './helpers/checkDbCon';

testDb();

logger.info(`node env: ${process.env.NODE_ENV}`);

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());

app.enable('trust proxy');

app.use(parsers.jsonParser);
app.use(parsers.urlencodedExtendedParser);

app.use(requestMiddleware.initiate);

app.use('/api/', auth, dansmultipro);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(
        errors.httpError.notFound(
            new errors.internalError.ResourceNotFoundError('URL'),
        ),
    );
});

app.use(
    (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        const appErrors = [];
        const data = err.errors || err;

        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i += 1) {
                appErrors.push(data[i].data);
            }
        } else {
            appErrors.push(data.data || data);
        }

        let { originalError } = err;

        if (appErrors[0] instanceof Error) {
            [originalError] = appErrors;
            appErrors.shift();
            const overidedError = new errors.internalError.UnknownError().data;
            appErrors.push(overidedError);
        }

        logger.errorException(res, {
            status: err.status || err.http_status || 500,
            appErrors,
            originalError,
        });
        responses.httpResponse.errorHandler(res, err.status || 500, {
            errors: appErrors,
            meta: { 'request-id': res.locals.requestId },
        });
    },
);

export default app;
