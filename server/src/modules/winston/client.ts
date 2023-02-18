import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';
// import Elasticsearch from 'winston-elasticsearch';

// const esTransportOpts = {
// 	index: `${process.env.NODE_ENV || 'localhost'}-siji-authentication`,
// 	level: 'info',
// 	clientOpts: {
// 		node: process.env.ES_HOST,
// 	},
// };

const logger = winston.createLogger({
    transports: [
        // new Elasticsearch(esTransportOpts),
        new winston.transports.Stream({
            stream: process.stderr,
            level: 'debug',
            format: winston.format.combine(
                winston.format.printf(
                    info => `${new Date().toISOString()}-${
                        info.level
                    }: ${JSON.stringify({ ...info }, null, 4)}\n`,
                ),
            ),
        }),
    ],
    exitOnError: false,
});
if (
    process.env.NODE_ENV !== 'localhost'
    && process.env.NODE_ENV !== 'development'
) {
    logger.add(
        new Loggly({
            token: process.env.LOGGLY_TOKEN || '',
            subdomain: process.env.LOGGLY_SUBDOMAIN || '',
            tags: [
                process.env.NODE_ENV || '',
                process.env.npm_package_name || '',
            ],
            json: true,
            level: 'debug',
        }),
    );
}
export default logger;
