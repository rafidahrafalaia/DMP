const orderableType = {
    true: 'true',
};

const searchableType = {
    true: 'true',
};

class NodeTable {
    constructor(request, db, table, primaryKey, columns) {
        this.request = request;
        this.db = db;
        this.table = table;
        this.primaryKey = primaryKey;
        this.columns = columns;
    }

    limit() {
        let limit = '';

        if (this.request.start !== '' && this.request.length !== '') {
            limit = ` LIMIT ${parseInt(this.request.start, 10)}, ${parseInt(
                this.request.length,
                10,
            )}`;
        }

        return limit;
    }

    order() {
        let order = '';
        const orderBy = [];

        if (this.request.order.length > 0) {
            const dtColumns = NodeTable.pluck(this.columns, 'dt');
            this.request.order.forEach((element, index) => {
                // Convert the column index into the column data property
                let columnIdx = parseInt(this.request.order[index].column, 10);

                const requestColumn = this.request.columns[columnIdx];

                columnIdx = dtColumns[requestColumn.data];

                const column = this.columns[columnIdx];

                if (requestColumn.orderable === orderableType.true) {
                    const dir = this.request.order[index].dir === 'asc'
                        ? 'ASC'
                        : 'DESC';

                    orderBy.push(`${column.db} ${dir}`);
                }
            });

            if (orderBy.length > 0) {
                order += ` ORDER BY ${orderBy.join(', ')}`;
            }
        }
        return order;
    }

    filter() {
        const globalSearch = [];

        const dtColumns = NodeTable.pluck(this.columns, 'dt');


        if (this.request.search !== '' && this.request.search.value !== '') {
            const searchStr = this.db.escape(`%${this.request.search.value}%`);
            // Get columns search
            this.request.columns.forEach((ele, index) => {
                const requestColumn = this.request.columns[index];

                const columnIdx = dtColumns[requestColumn.data];

                const column = this.columns[columnIdx];

                if (requestColumn.searchable === searchableType.true) {
                    globalSearch.push(`${column.db} LIKE ${searchStr}`);
                }
            });
        }
        // Combine the filters in the single string
        let where = '';
        if (globalSearch.length > 0) {
            where = `(${globalSearch.join(' OR ')})`;
        }

        if (where !== '') {
            where = ` WHERE ${where}`;
        }
        return where;
    }

    buildQuery() {
        // Build SQL query string from the request
        const limit = this.limit();
        const order = this.order();
        const where = this.filter();

        // Check if table is table name or SQL query
        if (NodeTable.isValidSQL(this.table)) {
            // It is a custom SQL query so make it a subquery by wrapping it arround ()temp
            this.table = `(${this.table})temp`;
        }

        return `SELECT ${NodeTable.pluck(this.columns, 'db').join(', ')} FROM ${
            this.table
        } ${where} ${order} ${limit}`;
    }

    /**
     * Perform the SQL queries needed for server-side processing requested,
     * utilizing the helper functions of this class, limit(), order() and
     * filter() among others. The returned array is ready to be encoded as JSON
     * in response to an SSP request, or can be modified if needed before
     * sending back to the client.
     * @param callback - a callback function which is called at the end. It accepts two params
     * err - An error, data - the generated data which is expected by the Datatable
     */
    output(callback) {
        const queryString = this.buildQuery();
        this.db.query(queryString, (err, results, fields) => {
            if (err) {
                // Let the client handle the error
                callback(new Error(err), null);
            }

            const where = this.filter();

            // Count the filtered records
            this.db.query(
                `SELECT COUNT(${this.primaryKey}) AS filtered FROM ${this.table} ${where}`,
                (err1, records, cols) => {
                    if (err1) {
                        // Let the client handle the error
                        callback(new Error(err1), null);
                        return;
                    }

                    const filteredRecords = records[0].filtered;

                    // Count total records
                    this.db.query(
                        `SELECT COUNT(${this.primaryKey}) AS total FROM ${this.table}`,
                        (err2, resultCount, columns) => {
                            if (err2) {
                                callback(new Error(err2), null);
                                return;
                            }

                            const totalRecords = resultCount[0].total;

                            const output = {
                                draw:
                                    this.request.draw !== ''
                                        ? this.request.draw
                                        : 0,
                                recordsTotal: totalRecords,
                                recordsFiltered: filteredRecords,
                                data: NodeTable.mapData(this.columns, results),
                            };

                            // excute the callback
                            if (typeof callback === 'function') {
                                callback(null, output);
                            } else {
                                throw new Error('Provide a callable function!');
                            }
                        },
                    );
                },
            );
        });
    }

    static mapData(columns, data) {
        const out = [];

        data.forEach((ele, index) => {
            const row = {};

            columns.forEach((column, i) => {
                row[column.db] = data[index][column.db];
            });

            out.push(row);
        });

        return out;
    }

    static pluck(dataArray, prop) {
        const out = [];

        dataArray.forEach((element, index) => {
            out.push(dataArray[index][prop]);
        });

        return out;
    }

    static isValidSQL(query) {
        const arr = query.toString().split(' ');

        if (
            arr.length > 1
            || arr.includes('SELECT')
            || arr.includes('select')
        ) {
            return true;
        }

        return false;
    }
}

module.exports = NodeTable;
