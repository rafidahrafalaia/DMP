import knex from '../data/knex';
import { logger } from '.';

/**
 * Test db connection on startup
 *
 * @returns void
 */
const testDb = async () => {
    try {
        await knex.raw('show tables');
        logger.info('status db connection: success');
    } catch (err) {
        logger.error('status db connection: failed', err);
    }
};

export { testDb };
